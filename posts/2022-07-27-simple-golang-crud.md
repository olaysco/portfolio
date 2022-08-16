---
title: Create a CRUD application with Golang and PostgreSQL
date: 2022-07-27
description: Learn how to create a RESTful API using GoLang and PostgreSQL.
tags: [golang, PostgreSQL, API]
cover: goapi.png
audience: beginner-level, developers who are just starting out to learn GoLang.
Techniques (teaching points):
  - quick summary of the application
  - simple HTTP server without mux.
  - introduce mux as depedency, test endpoint.
  - create methods for the endpoints.
  - implement endpoint to create
  - implement endpoint to read
  - implement endpoint to update
  - implement endpoint to delete
  - add test, introduce data-dog test
  - bonus introduces the simple orm or mention gorm
goal: At the end of the tutorial readers should be very confident in creating anty crud application
published: true
---

> I am not a politician. I am just a simple person who has come to break down this system. - Volodymyr Zelensky

Golang is a modern programming language that allows us to create advanced software applications that are fast, scalable, and easy to learn. On the other hand, PostgreSQL is a free and open-source object-relational database system that is renowned for its dependability, feature robustness, and performance.

In this guide, we will learn how to create an API with endpoints to create, read, update, and delete (CRUD) data in GoLang using PostgresSQL as the database. In the article, we will assume the role of a backend developer who has been assigned the task of building an application for managing users’ data. The company previously used an excel sheet, and now they want to build a web application to manage the data. Since we are backend developers, the focus is on the backend of the application.

![data_format](/images/blog/20220727simplegolangcrud/excel.png 'Imaginary inc. data in a spreadsheet')

## Prerequisites

- Golang is installed and running on your system.
- You have a basic understanding of Golang.
- (Optional) You have PostgreSQL installed on your system.

## Setup folder structure and install dependencies

We will create a new file `main.go` in the application folder with an empty main function. This file will be the application entry point.

```go
package main

func main() {
}
```

To manage the application dependencies, we will use `gomod`, and initialize it using the following command, where `{username}` is your Github username, and `{dir}` is the application's directory.

```
go mod init github.com/{username}/{dir}
```

![data_format](/images/blog/20220727simplegolangcrud/gomod.png 'go.mod file with no dependencies')

The go mod init command creates a go.mod file to track the code's dependencies. So far, the file includes only the name of the application and the Go version the code supports. As we add dependencies, the go.mod file will list the dependencies and the versions the code depends on.

The first dependency we will install is [Viper](https://github.com/spf13/viper). Viper is a module for managing configuration in Go applications. It helps to read configuration from environment variables with support for multiple sources. We will store the application configuration in a `.env` file and use Viper to read it. This ensures the application is compliant with the [Twelve-Factor-App](https://12factor.net/) checklist.

Run the following command to install Viper

```
go get github.com/spf13/viper
```

Install [Gorilla mux](github.com/gorilla/mux), Gorilla Mux is an extension of Go standard ServeMux, it implements the http.Handler interface, and used for request routing and dispatching.

Run the following command to install Gorilla mux

```
go get github.com/gorilla/mux
```

Install [pgx](github.com/jackc/pgx), pgx is a fast, low-level, and performant Go driver for PostgreSQL.

Run the following command to install pgx

```
go get github.com/jackc/pgx/v4
```

## Database Design

The first task is to translate the excel columns in the image above into a DB schema.

<div class="d-flex justify-content-center"><iframe width="560" height="315" src='https://dbdiagram.io/embed/62e441d9f31da965e8425d0c'> </iframe></div>

> If you don't have postgresql installed locally, Click this [link](https://customer.elephantsql.com/instance/create?plan=turtle) to create a PostgreSQL database online.

So we can keep track of changes to the database schema, we will save the database schema as database migrations. for this, we will use the Golang database migration [library](https://github.com/golang-migrate/migrate). Follow the [installation steps](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate) to install the CLI.

create a new folder `db/migration` in the application directory.

Run the following query to create the first migration file

```
migrate create -ext sql -dir db/migration imaginary_schema
```

The command will produce two new SQL files with "up" and "down" as their suffixes. The up file will contain SQL queries that will be executed when the migration is applied, while the `.down` file will contain SQL queries to be executed when the migration is rolled back. The `.down` is conventionally used to undo what was done in the `.up` file.

`20220623033707_imaginary_schema.up.sql`

```sql
CREATE TABLE "users" (
    "id" bigserial PRIMARY KEY,
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "email" varchar NOT NULL UNIQUE,
    "gender" varchar NOT NULL,
    "date_of_birth" date NOT NULL
);

CREATE INDEX ON "users" ("email");
CREATE INDEX ON "users" ("date_of_birth");
```

`20220623033707_imaginary_schema.down.sql`

```sql
DROP TABLE IF EXISTS users;
```

Run the following migration to migrate the table

```
migrate -path db/migration -database "postgres://<user>:<password>@localhost:5432/postgres?sslmode=disable" up
```

## Setup configuration

The application configuration would be stored in `.env` file and read as environment variables with Viper. In the application root folder, create a new file named `.env` with the following content. DB_URL should be replaced with the database URL.

```.env
DB_DRIVER=postgres
PORT=3000
HOST=localhost
DB_URL=postgres://xyz:xyz
```

Let's create new folder ` util``. In this folder, we will create a new file `config.go`. This file will contain the code to help read application configuration from the`.env` file.

```go
package util

import (
	"github.com/spf13/viper"
)

// Config stores the application configuration from environment variables
type Config struct {
	Host              string `mapstructure:"HOST"`
	Port              string `mapstructure:"PORT"`
	DBUrl             string `mapstructure:"DB_URL"`
	DBDriver          string `mapstructure:"DB_DRIVER"`
	HTTPServerAddress string `mapstructure:"HTTP_SERVER_ADDRESS"`
}

// LoadConfig reads application configuration from environment variables.
func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigFile(".env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)

	config.HTTPServerAddress = config.Host + ":" + config.Port
	return
}

```

## Create API router

Now we will create the HTTP router to handle the routes supported by the application. This controller will direct incoming requests from a specific path to a specific controller method. Create a new folder `api` in the application directory and create a new file `api.go`.

```go
package api

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/olaysco/imaginary/util"
)

type Api struct {
	DB     *sql.DB
	Router *mux.Router
	config util.Config
}

type Response struct {
	Data interface{} `json:"data"`
}

type PaginatedResponse struct {
	Data  interface{} `json:"data"`
	Count int         `json:"count"`
	Page  int         `json:"current_page"`
}

type ErrorResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

func NewAPi(config util.Config, db *sql.DB) *Api {
	api := &Api{
		DB:     db,
		config: config,
	}

	api.initializeRoutes()
	return api
}

func (a *Api) initializeRoutes() {
}

//Run http server i.e. start listening on server address
func (a *Api) Run() error {
	return http.ListenAndServe(a.config.HTTPServerAddress, a.Router)
}
```

The content is fairly simple, and we began by importing the packages we will be using. We defined four new types `Api` `Response`, `PaginatedRespone` and `ErrorResponse. We created the function NewApi(), which simply returns a new instance of Api. We called`initializeRoutes()`which we will define soon, and finally we define the`Run()`method. Once called, the application will start listening on the port defined in the`.env` file.

### Define routes supported by the application and their handler function

The request paths and methods we will be defining are:

- ALL METHODS "/" - returns "OK"
- GET "/users" - endpoint to get all users
- POST "/users" - endpoint to create a user
- PATCH "/users/{id}" - endpoint to update a user
- DELETE "/users/{id}" - endpoint to delete a user

In the `api/api.go` file, we will initialize the routes in `initializeRoutes()`

```go
...
func (a *Api) initializeRoutes() {
  a.Router = mux.NewRouter()

  a.Router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	  a.JSON(w, http.StatusOK, "OK")
  })
  a.Router.HandleFunc("/users", a.GetUsers).Methods("GET")
  a.Router.HandleFunc("/users", a.CreateUser).Methods("POST")
  a.Router.HandleFunc("/users/{id}", a.UpdateUser).Methods("PATCH")
  a.Router.HandleFunc("/users/{id}", a.DeleteUser).Methods("DELETE")
}
...
```

You will notice we called a method named `JSON()`, the `JSON()` method is a response helper to encode the response into JSON and set the appropriate response Content-Type header.

```go
...
//JSON response helper function
func (a *Api) JSON(w http.ResponseWriter, status int, data interface{}) {
	response, _ := json.Marshal(data)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(response)
}
...
```

What we need to implement now is the `a.GetUsers()`, `a.CreateUser()`, `a.UpdateUser()` and `a.DeleteUser()` route handlers, we will implement these in a separate file.

### Create Request Handlers

Create a new file `user.go` in the `api` folder.

```go
package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	db "github.com/olaysco/imaginary/db/model"
)

func (a *Api) GetUsers(w http.ResponseWriter, r *http.Request) {
}

func (a *Api) CreateUser(w http.ResponseWriter, r *http.Request) {
}

func (a *Api) UpdateUser(w http.ResponseWriter, r *http.Request) {
}

func (a *Api) DeleteUser(w http.ResponseWriter, r *http.Request) {)
}

```

```go
func (a *Api) GetUsers(w http.ResponseWriter, r *http.Request) {
	// FormValue allows us to read inputs from the current request body
	// either from the URL query, POST, or PUT body.
	// The page and per_page values, are used to paginate the result;
	// we read them from FormValues and then convert to integer.
	offset, _ := strconv.Atoi(r.FormValue("page"))
	limit, _ := strconv.Atoi(r.FormValue("per_page"))

	if limit <= 0 {
		limit = 10
	}
	if offset <= 0 {
		offset = 1
	}

	listUserArg := db.ListUserArg{
		Limit:  limit,
		Offset: offset,
	}

	users, err := db.ListUsers(a.DB, r.Context(), listUserArg)
	if err != nil {
		a.JSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	a.JSON(w, http.StatusOK, &PaginatedResponse{Data: users, Count: len(users), Page: offset})
}
```

```go
func (a *Api) CreateUser(w http.ResponseWriter, r *http.Request) {
	// Initialize the decoder and call DisallowUnknownFields() method.
	// This will cause Decode() to return a "json: unknown field ..." error
	// if it encounters any extra unexpected fields in the JSON.
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	var u db.UserArg

	// Decode the json into a user struct, and return any error as a server error.
	// Though, this is not an accurate error response.
	err := dec.Decode(&u)
	if err != nil {
		a.JSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	err = db.CreateUser(a.DB, r.Context(), u)
	if err != nil {
		a.JSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	a.JSON(w, http.StatusCreated, &Response{Message: "User created successfully", Status: http.StatusCreated})
}
```

```go
func (a *Api) UpdateUser(w http.ResponseWriter, r *http.Request) {
	// Use the mux.vars function to read the route variables of the
	// current request.
	// for example if the path is defined as /user/{id},
	// the {id} here is referred to as a route variable.
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	var u db.UserArg
	err := dec.Decode(&u)
	if err != nil {
		a.JSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	err = db.UpdateUser(a.DB, r.Context(), int64(id), u)
	if err != nil {
		a.JSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	a.JSON(w, http.StatusAccepted, &Response{Message: "User updated successfully", Status: http.StatusAccepted})
}
```

```go
func (a *Api) DeleteUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	intId, _ := strconv.Atoi(id)

	err := db.DeleteUser(a.DB, r.Context(), int64(intId))
	if err != nil {
		a.JSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	a.JSON(w, http.StatusOK, &Response{Message: "User deleted successfully", Status: http.StatusOK})
}
```

The route handlers are simple, what they do is retrieve necessary input from the request, call the appropriate model function and return a JSON response to the caller.

Next, we create the model functions. These will represent the database access layer, where we communicate with the database using raw SQL statements.

### Create Database model

Create a new file `user.go` in 'db/model' folder, with the following content

```go
package db

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v4"
)

type NullString struct {
	Value string
	Valid bool
}

type User struct {
	ID          int64     `json:"id"`
	Email       string    `json:"email"`
	Gender      string    `json:"gender"`
	LastName    string    `json:"last_name"`
	FirstName   string    `json:"first_name"`
	DateOfBirth time.Time `json:"date_of_birth"`
}

type ListUserArg struct {
	Email           NullString `json:"email"`
	Limit           int        `json:"limit"`
	Offset          int        `json:"offset"`
	DateOfBirthTo   NullString `json:"dob_to"`
	DateOfBirthFrom NullString `json:"dob_from"`
}

type UserArg struct {
	Email       string `json:"email"`
	Gender      string `json:"gender"`
	LastName    string `json:"last_name"`
	FirstName   string `json:"first_name"`
	DateOfBirth string `json:"date_of_birth"`
}

// ListUsers returns a slice of users
func ListUsers(db *pgx.Conn, ctx context.Context, args ListUserArg) ([]User, error) {
}

// CreateUser creates a new user
func CreateUser(db *pgx.Conn, ctx context.Context, args UserArg) error {
}

// UpdateUser updates a user by id
func UpdateUser(db *pgx.Conn, ctx context.Context, id int64, args UserArg) error {
}

// DeleteUser deletes a user by id
func DeleteUser(db *pgx.Conn, ctx context.Context, id int64) error {
}
```

```go
// ListUsers returns a slice of users
...
// ListUsers returns a slice of users
func ListUsers(db *pgx.Conn, ctx context.Context, args ListUserArg) ([]User, error) {
	rows, err := db.Query(ctx, "Select id, first_name, last_name, email, gender, date_of_birth from users")
	if err != nil {
		return nil, err
	}

	// defer, delays the closing of the row until the function returns.
	defer rows.Close()

	// Slice to store users that are retreived from the database.
	users := []User{}

	// Keep reading the result rows.
	for rows.Next() {
		var u User

		// Read the current row into a user struct,
		// It is important that the scan parameters
		// matches the sql select statement.
		if err := rows.Scan(
			&u.ID,
			&u.FirstName,
			&u.LastName,
			&u.Email,
			&u.Gender,
			&u.DateOfBirth,
		); err != nil {
			return nil, err
		}

		users = append(users, u)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
...
```

```go
...
// CreateUser creates a new user
func CreateUser(db *pgx.Conn, ctx context.Context, args UserArg) error {
	// We create a prepared statment, with the insert values represented with placeholders.
	stmt, err := db.Prepare(ctx, "", "INSERT INTO users (first_name, last_name, email, gender, date_of_birth)  VALUES ($1, $2, $3, $4, $5)")
	if err != nil {
		return err
	}

	_, err = db.Exec(ctx, stmt.SQL, args.FirstName, args.LastName, args.Email, args.Gender, args.DateOfBirth)
	return err
}
...
```

```go
...
// UpdateUser updates a user by id
func UpdateUser(db *pgx.Conn, ctx context.Context, id int64, args UserArg) error {
	sql := "UPDATE users SET "
	var sqlArgs []interface{}
	var values []string

	// A column value would be updated if doesn't contain an empty value.
	if args.DateOfBirth != "" {
		values = append(values, fmt.Sprintf("date_of_birth = $%d", len(sqlArgs)+1))
		sqlArgs = append(sqlArgs, args.DateOfBirth)
	}

	if args.Email != "" {
		values = append(values, fmt.Sprintf("email = $%d", len(sqlArgs)+1))
		sqlArgs = append(sqlArgs, args.Email)
	}

	if args.FirstName != "" {
		values = append(values, fmt.Sprintf("first_name = $%d", len(sqlArgs)+1))
		sqlArgs = append(sqlArgs, args.FirstName)
	}

	if args.LastName != "" {
		values = append(values, fmt.Sprintf("last_name = $%d", len(sqlArgs)+1))
		sqlArgs = append(sqlArgs, args.LastName)
	}

	if args.Gender != "" {
		values = append(values, fmt.Sprintf("gender = $%d", len(sqlArgs)+1))
		sqlArgs = append(sqlArgs, args.Gender)
	}
	sql += strings.Join(values, ", ")

	sql += fmt.Sprintf("WHERE id = $%d", len(sqlArgs)+1)
	sqlArgs = append(sqlArgs, strconv.FormatInt(id, 10))

	stmt, err := db.Prepare(ctx, "", sql)
	if err != nil {
		return err
	}

	// Execute the prepared statment, and bind the update values to the placeholders.
	_, err = db.Exec(ctx, stmt.SQL, sqlArgs...)

	return err
}
...
```

```go
...
// DeleteUser deletes a user by id
func DeleteUser(db *pgx.Conn, ctx context.Context, id int64) error {
	// We create a prepared statment, with the id of the row to be deleted reprented with a placeholder.
	stmt, err := db.Prepare(ctx, "", "DELETE FROM users WHERE id = $1")
	if err != nil {
		return err
	}

	// Execute the prepared statment, while binding `id ` value to the placeholder.
	_, err = db.Exec(ctx, stmt.SQL, id)
	return err
}
...
```

We used prepared statements in the data manipulation queries(INSERT, UPDATE and DELETE) because it is more advantageous than executing the queries directly. The primary benefit is that it safeguards the application from SQL injections.
Prepared statements "prepare" the SQL query first to identify an effective query strategy, Then the actual values can be sent as pure data.

The last thing to do now is to start the HTTP server, for the application to start receiving HTTP requests.

### Start HTTP server

Paste the following content into the `main.go` file

```go
package main

import (
	"context"
	"log"

	"github.com/jackc/pgx/v4"
	"github.com/olaysco/imaginary/api"
	"github.com/olaysco/imaginary/util"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("error loading config:", err)
	}

	conn, err := pgx.Connect(context.Background(), config.DBUrl)
	if err != nil {
		log.Fatal("error connecting to db:", err)
	}

	defer conn.Close(context.Background())

	serveHTTP(config, conn)
}

func serveHTTP(config util.Config, db *pgx.Conn) {
	log.Printf("server listening at addreess %s", config.HTTPServerAddress)
	server := api.NewAPi(config, db)
	err := server.Run()

	if err != nil {
		log.Fatalf("error starting server at address %s: %s", config.HTTPServerAddress, err.Error())
	}
}
```

We are almost done, and your folder structure should look like the image below.

![Application folder structure](https://res.cloudinary.com/function/image/upload/v1660600817/blog/Screenshot_2022-08-15_at_22.59.34.png)

Run the following command to start the HTTP server, so we can start testing

```
go run main.go
```

![](https://res.cloudinary.com/function/image/upload/v1660585942/blog/Screenshot_2022-08-15_at_18.50.54.png)

## Testing the application with an HTTP Client

1. POST /users - create a new user.
   ![](https://res.cloudinary.com/function/image/upload/v1660585942/blog/Screenshot_2022-08-15_at_18.51.26.png)

2. GET /users - get all users.
   ![](https://res.cloudinary.com/function/image/upload/v1660601729/blog/Screenshot_2022-08-15_at_23.12.30.png)

3. PATCH /users/{id} - update a user.
   ![](https://res.cloudinary.com/function/image/upload/v1660601729/blog/Screenshot_2022-08-15_at_23.07.54.png)

4. DELETE /users/{id} - update a user.
   ![](https://res.cloudinary.com/function/image/upload/v1660601729/blog/Screenshot_2022-08-15_at_23.11.41.png)

## Key Takeaways

You have learned how to build a basic REST API and access the database without an ORM. We'll include unit tests and appropriately handle concurrent database read and write with the pgx module concurrency pool in a subsequent article.

---

_PS: if you have any questions, or notice any wrong assumptions, feel free to reach out on Twitter [@horllaysco](https://twitter.com/horllaysco)_
