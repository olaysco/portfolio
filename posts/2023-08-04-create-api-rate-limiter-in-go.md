---
title: Create an API Rate Limiter in Golang
date: 2023-08-04
description: Learn how to create an API Rate Limiter in GoLang.
tags: [golang, Security, API]
cover: rate-limit.png
audience: beginner-level, developers who are just starting to learn GoLang.
Techniques (teaching points):
goal: At the end of the tutorial readers should be very confident in using Redis, types and how middleware works in Golang.
published: true
---

> All limits are self-imposed. <p><b>Icarus</b></p>

In this article, we will implement a feature that limits the number of requests users can make to an endpoint over a period, the feature will be implemented as middleware.

## What is middleware?

Middleware is a design pattern to eloquently add a bridge between a request and a response. this bridge can handle concerns like logging, handling authentication, or gzip compression without having to duplicate codes in multiple places. The middleware handler in Go is simply an `http.Handler` that wraps another `http.Handler` to perform pre and/or post-processing operation on the request or before the response.

For this article our focus will be creating a middleware that limits the number of API requests a user can make over a certain period, e.g. 100 RPS(Request per second) to an endpoint, this process is also known as API request throttling and there is quite some number of advantages of throttling a request, of which some are:

1. Prevent DDoS attack - A distributed denial-of-service (DDoS) attack is when a malicious user overwhelms a target or its surrounding infrastructure with a flood of Internet traffic to disrupt the server operation and use up its server resources, by having a throttle in place, such requests will be slowed down and hence the malicious user will not be able to achieve its goal.
2. Monetization - For organizations where API usage by users are a source of revenue, API request could be throttled to limit the number of request per second(RPS) per category of users. e.g. silver users can make 1000 RPS, while trial users can only make 10 RPS
3. Save Cost - Throttling the incoming request can help make the RPS on a server predictable ensuring that the server avoids incurring unexpected charges from cloud services, also this can be used as part of the cost-saving plan on cloud services like AWS EC2, where the server can benefit from using an EC2 Reserved Instance instead of a Dedicated Instance since the capacity required can be estimated beforehand.

## Let's create a simple HTTP server

Create a new directory in your `$GOPATH/src` directory, in this directory, create a new file named `main.go` with the code below at its content. This starts a new simple HTTP server with the two endpoints `/v1/hello` - which prints `Hello World!` and `/v1/greet` - `How are you doing?` to the user.

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    addr := "localhost:3000"

    mux := http.NewServeMux()
    mux.HandleFunc("/v1/hello", HelloHandler)
    mux.HandleFunc("/v1/greet", GreetHandler)

    log.Printf("server is listening at %s", addr)
    log.Fatal(http.ListenAndServe(addr, mux))
}

// HelloHandler will say hello to user.
func HelloHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Hello World!"))
}

// GreetHandler will greet the user.
func GreetHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("How are you doing?"))
}
```

```bash
go run main.go
```

To test the endpoints in another terminal window

```bash
curl -i http://localhost:3000/v1/hello
curl -i http://localhost:3000/v1/greet
```

## Throttle Middleware

We will create a new file in our application directory, and call it `throttle.go` this file will be in the `middleware/throttle` directory and will contain our core throttle logic.

We first start with some importing of packages that we will be needing in the file later on, all of the packages are from the standard library.

```go
package throttle

import (
	"crypto/sha1"
	"encoding/hex"
	"net"
	"net/http"
	"strings"
	"time"
)
```

Then we declare the types we will need for our throttle logic.

- Count: We introduce a custom type called `Count` to facilitate our numeric representation. By utilizing a custom type, such as `Count`, we can effectively manage situations where a null count needs to be stored, in contrast to the default zero value of a numeric type like `int`.
 

```go
type Count int

type Throttle struct {
	limit  int            // The maximum number of actions allowed within a certain time frame.
	elapse int64          // The time frame (in milliseconds) during which the actions are limited.
	store  StoreInterface // The storage interface used to keep track of action timestamps.
}

type Instance struct {
	ip    string
	key   []byte
	route string
	limit int
	time  time.Time
	store StoreInterface
}

type StoreInterface interface {
	get(key string) (Count, bool)
	set(key string, count Count, expiresAt time.Time) bool
}
```

```go
func (t Throttle) ThrottleRequest(f http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		i := &Instance{
			ip:    getUserIP(r),
			route: r.URL.Path,
			limit: t.limit,
			time:  time.Now().Add(time.Duration(t.elapse) * time.Second), store: t.store,
		}
		if !i.check() {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusTooManyRequests)
			return
		}
		f(w, r)
	})
}
```

```go

func (i *Instance) check() bool {
	if i.count() < i.limit {
		i.hit()
		return true
	}

	return false
}

func (i *Instance) getKey() string {
	if i.key == nil {
		h := sha1.New()
		h.Write([]byte(i.ip + i.route))
		i.key = h.Sum(nil)
	}

	return hex.EncodeToString(i.key)
}

func (i *Instance) count() int {
	if data, ok := i.store.get(i.getKey()); ok {
		return int(data)
	}

	return 0
}

func (i *Instance) hit() {
	i.store.set(i.getKey(), Count(i.count()+1), i.time)
}

func getUserIP(r *http.Request) string {
	userIP := r.RemoteAddr
	if strings.Contains(userIP, ":") {
		return net.ParseIP(strings.Split(userIP, ":")[0]).String()
	}
	return net.ParseIP(userIP).String()
}
```


```go
package throttle

import (
	"sync"
	"time"
)

type DefaultStore struct {
	storage map[string]*ThrottleData
	sync.RWMutex
}

type ThrottleData struct {
	Count     int
	ExpiresAt time.Time
}

func NewDefaultStore() *DefaultStore {
	return &DefaultStore{
		storage: make(map[string]*ThrottleData),
	}
}

func (s *DefaultStore) set(key string, count Count, expiresAt time.Time) bool {
	_, ok := s.get(key)
	s.Lock()
	defer s.Unlock()

	if !ok {
		s.storage[key] = &ThrottleData{Count: int(count), ExpiresAt: expiresAt}
		return true
	}

	s.storage[key].Count = int(count)
	return true
}

func (s *DefaultStore) get(key string) (Count, bool) {
	s.RLock()
	defer s.RUnlock()
	data, ok := s.storage[key]

	if !ok {
		return 0, false
	}

	if ok && time.Now().After(data.ExpiresAt) {
		data = nil
		ok = false

		return 0, false
	}

	return Count(data.Count), ok
}
```

```go
func main() {
	addr := "localhost:3000"

	mux := http.NewServeMux()
	throttle := throttle.NewThrottle(throttle.NewDefaultStore(), 5, 20)

	mux.HandleFunc("/v1/hello", throttle.ThrottleRequest(HelloHandler))
	mux.HandleFunc("/v1/greet", throttle.ThrottleRequest(GreetHandler))

	log.Printf("server is listening at %s", addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}
```

_PS: if you have any questions, or notice any wrong assumptions, feel free to reach out on Twitter [@horllaysco](https://twitter.com/horllaysco)_
