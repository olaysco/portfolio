---
title: Production-Ready Beanstalkd with Laravel Queues
date: 2023-07-11
description: Queues are one of the integral parts of a scalable system, this article introduces the users to Queues and how they can integrate it into their Laravel application to improve the system performance.
tags: [PHP, Distributed-Systems, Laravel, Queue]
cover: queue-blog.png
published: true
---

> Great works are performed not by strength but by perseverance. - Samuel Johnson

In the world of software engineering, queues assume a crucial role in guaranteeing the seamless and efficient operation of complex systems. Tasks such as sending emails, deleting accounts, and processing images often require significant processing time or consume considerable memory. Such tasks are ideal candidates to be offloaded to a queue, where they can be managed and processed asynchronously, freeing up system resources and enhancing overall performance.

Let's consider a hypothetical scenario in which our system involves users uploading videos that need compression and manipulation after being uploaded, Without a queue system, users would experience delays in both the upload and processing stages, leading to a perceived slow system. To overcome this, we instead send an immediate response to the user after the upload and let the video processing be performed in the background, notifying the user through other means like push notifications. This approach ensures a smoother user experience.

![Queue Work](https://res.cloudinary.com/function/image/upload/v1690607250/blog/queueue-work.png)

In this article, we will look into setting up a Laravel Application with Beanstalkd in a production environment, under the following headings

- [What is a Queue?](#what-is-a-queue)
- [Setting up Beanstalkd on the server](Beanstalkd)
- [Connecting Beanstalkd to Laravel Application](#connecting-beanstalkd-to-laravel-application)
- [Optimizing for Production](#optimizing-for-production)

## What is a Queue?

A queue is simply a data structure that only allows an element to be added after its last element (i.e. Enqueue) and an element to be removed from the front (i.e. Dequeue), this behavior is known as First-In-First-Out (FIFO).

![](https://res.cloudinary.com/function/image/upload/v1690133253/blog/f2s0axgibtjimeul7tub.png)

#### Queue Terminologies

The following are some queue-related terms that you need to be familiar with to work with a queue:

- Enqueue: Enqueue adds elements to the rear of the queue as long as it is not full.
- Dequeue: Dequeue removes the first element from the front, ensuring it is not empty to avoid underflow.
- Peek: Peek allows accessing the value of the first element without altering the queue.
- Producer: The producer is the component of the system that is essentially responsible for generating a new task that needs to be enqueued.
- Dispatcher: The Dispatcher is responsible for receiving incoming tasks from producers and then forwarding them to available consumers for processing.
- Consumer: Consumers are also known as workers or subscribers. They actively monitor the queue for new tasks and process them according to predefined logic or functionality.

## Beanstalkd

[Beanstakld](https://beanstalkd.github.io/) is a simple asynchronous queue system, that acts as an intermediary enabling task exchange between producers and consumers. Alongside popular queue systems like RabbitMQ, AWS SQS, and Apache Kafka, it efficiently facilitates asynchronous communication.

Follow these steps to install Beanstalkd on a Debian or Ubuntu Linux machine:

Step 1: Use the following command to install Beanstalkd via apt-get:

```bash
$ sudo apt-get install beanstalkd
```

For users of other Linux distributions or operating systems, you can find detailed installation instructions at this [URL](https://beanstalkd.github.io/download.html).

Step 2: Ensure that the Beanstalkd service is configured to restart automatically on system boot with the following command:

```bash
$ sudo systemctl enable beanstalkd
```

With Beanstalkd installed and configured, the next step is to connect it to our Laravel application in the upcoming section.

## Connecting Beanstalkd to Laravel Application

Laravel simplifies the usage of queues, making it a straightforward process. In our application, that acts as the `producer`, we can easily add a `job` to the queue by running a command like `Queue::push('SendEmail', ['email' => $email]);`. After the job has been added to the queue, we will also configure a worker to fetch and handle available jobs. while Beanstalkd will coordinate the asynchronous communication between the job Producer and the Consumer.

Follow these steps to integrate Beanstalkd with our Laravel application:

#### Step 1: Install the Laravel Beanstalkd Queue Driver

To begin, we need to install the Beanstalkd queue driver for Laravel. As it is not included by default, we can add it to our project using Composer. Open a terminal and run the following command:

```bash
$ composer require pda/pheanstalk
```

#### Step 2: Configure Beanstalkd Connection Settings

After installing the queue driver, we must configure the connection settings for Beanstalkd in our Laravel application. Locate the `config/queue.php` file and add a new connection configuration for Beanstalkd as follows:

```php
'beanstalkd' => [
    'driver' => 'beanstalkd',
    'host' => '127.0.0.1', // Beanstalkd server IP address or hostname
    'queue' => 'video_processing', // The queue name for video processing jobs
    'ttr' => 60, // The "time-to-run" for jobs in seconds
],
```

> ttr - (time to run) is the duration a worker has to complete a job after reserving it. If not completed within `<ttr>` seconds, the job times out and is released

Ensure the `host`, `queue`, and `ttr` values align with your Beanstalkd server settings and application requirements.

#### Step 3: Configure Queue Connection

To update the queue connection for our application, open the `.env` environment file and add the following line, or update the existing `QUEUE_CONNECTION` variable to:

```yaml
QUEUE_CONNECTION=beanstalkd
```

#### Step 4: Start the Laravel Worker

With the configuration in place, it's time to launch the Laravel worker responsible for handling video processing jobs. Open a terminal, navigate to your Laravel project's root directory, and run the following command:

```bash
php artisan queue:listen beanstalkd
```

This command initiates the worker using Beanstalkd as the queue driver. The worker will continuously process video-processing jobs as they arrive in the `video_processing` queue.

#### Step 5: Dispatch Video Compression Jobs

Now, we can dispatch video compression jobs to the queue for processing. Whenever a user uploads a video, use the `dispatch` method to queue the video processing job. For example:

```php
use App\Jobs\CompressAndManipulateVideo;

CompressAndManipulateVideo::dispatch($uploadedVideoPath);
```

In this illustration, we dispatch a `CompressAndManipulateVideo` job to the `video_processing` queue, specifying the path of the uploaded video to be processed.

With these setups completed, our Laravel application is now connected to Beanstalkd. New video uploads are queued and processed in the background, ensuring a smooth user experience without delays. However, if the `queue:listen` command is mistakenly aborted, job processing stops. To prevent this, we need a service that ensures the queue command is always active. That's where [Supervisord](http://supervisord.org/) comes into play.

#### Step 6: Configuring Supervisord

Use the command below to install Supervisord

```sh
$ sudo apt-get install supervisor
```

Create a new configuration file for our queue

```sh
$ cd /etc/supervisor/conf.d
$ touch /etc/supervisor/conf.d
```

Put the content below into the new file

```yaml
[program:video-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/laravel/artisan queue:listen beanstalkd --sleep=3 --tries=3 --max-time=6200
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
numprocs=1
redirect_stderr=true
stdout_logfile=/path/to/laravel/app/storage/logs/worker.log
stopwaitsecs=3600
```

Make sure to replace `/path/to/laravel/` with the actual path to your Laravel application. After successfully creating the configuration file, we can now proceed to update the Supervisor configuration and start the process:

```sh
$ sudo supervisorctl reread
$ sudo supervisorctl update
$ sudo supervisorctl start video-queue:*
```

Supervisord will now monitor the `video-queue` process, and in case of any failure or abortion in the queue listener, Supervisord will automatically restart the process.

## Optimizing for Production

### Segregation of Queues for Improved Efficiency

In large-scale applications dealing with a substantial number of daily jobs, it's beneficial to avoid using a generic queue for all tasks. Instead, segregate jobs into different categories based on their types. This allows for easier prioritization and enhances flexibility in scaling and sizing the queues accordingly.

```php
// Avoid using the default queue for all the jobs.
CompressAndManipulateVideo::dispatch();
ImageCompressor::dispatch();
SoundAnalyzer::dispatch();

// Instead segregate jobs into different queues for prioritization
CompressAndManipulateVideo::dispatch()->onQueue('video_processing');
ImageCompressor::dispatch()->onQueue('image_processing');
SoundAnalyzer::dispatch()->onQueue('sound_processing');
```

### Separate Beanstalkd from the Application Server

Given that Beanstalkd is an in-memory service, it can heavily consume server resources, especially under high load. To optimize for production, it's highly recommended to install Beanstalkd on a separate server. This approach ensures more efficient resource management and mitigates potential performance issues caused by resource contention.

Then you only have to update the Beanstalkd connection host in `config/queue.php` file to point to this remote server IP:

```php
'beanstalkd' => [
    'driver' => 'beanstalkd',
    'host' => 'remote_host_IP', // Remote Beanstalkd server IP address or hostname
    ...
],
```

By segregating queues and separating Beanstalkd from the application server, you create a smoother and more reliable processing environment, ultimately enhancing the overall efficiency of your application.

_PS: if you have any questions, or notice any wrong assumptions, feel free to reach out on Twitter [@horllaysco](https://twitter.com/horllaysco)_
