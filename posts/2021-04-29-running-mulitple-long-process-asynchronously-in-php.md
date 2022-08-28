---
title: Simple Way to Run Multiple Long-Running Processes in PHP Asynchronously
date: 2021-04-29
description: Learn how you can run multiple long-running processes in PHP asynchronously
tags: [Go]
cover: asynchronous-php.gif
published: true
---

A task that prevents other tasks from being executed until completion is known as a **synchronous operation** whereas a task that does not block other tasks from being executed even while it is yet to be completed is known as an **asynchronous operation**. There are several scenarios during development when there's the need to perform an I/O task that executes for a very long time asynchronously, some of these are when you need to, maybe:

1. Send out 300k+ emails at once to customers and probably include each customer's cumulative spending from another API.
2. Process 1m+ CSV rows, clean up and save into database
3. Send subscription reminders to 1m+ users

Looking at each example case above, we can easily see the need for asynchronous processing, In this article we would look at a simple way to implement asynchronous processing in PHP.

Though most developers (especially PHP haters 😂) acknowledge PHP as being single-threaded which is not the absolute truth as PHP supports multi-threading but this is not widely known because the default installation of PHP does not come compiled with the [pThreads extension](https://www.php.net/manual/en/class.thread.php) that allows tasks to be run on separate Threads.

We won't be using the Thread class for asynchronous processing in this article, but here is a sample code of what a code using Thread would look like.

```php
<?php

class EmailSenderThread extends Thread {

    public $email;

    public function __construct(String $email)
    {
        $this->email = $email;
    }

    public function run()
    {
        if (!empty($this->email)) {
            echo "started processing $this->email";
            sleep(mt_rand(1,10));
            echo "done processing $this->email";
        }
    }
}

$emails = array_fill(0, 10000, 'random@email.com');
$workers = [];
array_walk($emails, function($email, $index) use ($workers) {
    $workers[$index] = new EmailSenderThread($email);
    $workers[$index]->start();
});

?>

```

Another mechanism to run process asynchronously in PHP is using the [parallel functional API](https://www.php.net/manual/en/parallel.run) that allows easy scheduling of tasks for asynchronous processing, like the pThreads mentioned above it doesn't come precompiled with PHP. the parallel\run is very interesting as it is very close to [goroutines in Golang](https://gobyexample.com/goroutines), it also has a [Channel API](https://www.php.net/manual/en/class.parallel-channel.php) that allows bi-directional communication among parallel running tasks, (sweet isn't it 👌🏾). below is a sample code of what using the parallel functional API would look like:

```php
<?php

use \parallel\{Runtime, Future, Channel, Events};

$sender = function ($email)
{
        echo "started processing $email";
        sleep(mt_rand(1,10));
        echo "done processing $email";
}

$emails = array_fill(0, 10000, 'random@email.com');
array_walk($emails, function($email, $index) use ($workers) {
    \parallel\run($sender, array($email));
});

?>
```

Setting up any of the two mechanisms mentioned above might not come easy, especially on servers with restricted access where the developer is not authorized to install extensions, this is where the [Symfony Process](https://symfony.com/doc/current/components/process.html) package comes in

> The Symfony\Component\Process\Process class executes a command in a sub-process, taking care of the differences between operating systems and escaping arguments to prevent security issues.

all that needs to be done is

```
composer require symfony/process
```

and we're good to go, Laravel users need not run this command as it comes preinstalled.

Before we dive into using the **Process Component** below are some things to note:

1. The Process Component is for executing commands, this implies that the task we intend to run asynchronously must be in form of a command.
2. The Process Component executes the command in a child process, which means that once the Process that spawned the child process finishes execution all its child processes will be terminated as well, even if they are still running.
3. The Process Component has two commands that are used to begin the execution of a sub-process

   - run() - run is synchronous and blocking.

     ```php
     <?php

     use Symfony\Component\Process\Process;

     $process = new Process(['/usr/bin/php', 'worker.php']);
     $process->run();
     //block until worker is completed
     echo 'completed';
     ```

   - start() - start is asynchronous and non-blocking.

     ```php
     <?php

     use Symfony\Component\Process\Process;

     $process = new Process(['/usr/bin/php', 'worker.php']);
     $process->start();
     //continue doing other things while worker is running
     echo 'process started, doing other things';
     ```

### **Symfony Process Component in action**

In this section, we would look at an example of using the Process component to break a task into multiple processes and have them run asynchronously.

> task.php // this is the code that performs the main operation, and would be run multiple times

```php
<?php

/**
* gets the argument passed to the script
* the first argument ($argv[0]) is always the filename
* the other indexes include other arguments
*/
$email = $argv[1] ?? null;

$sender = function ($email)
{
        echo "started processing $email";
        sleep(mt_rand(1,10));
        echo "done processing $email";
};

if (!empty($email)) {
    $sender($email);
}
```

> worker.php // this is the main process that would spawn and manage multiple _Task.php_ sub-processes.

```php
<?php

use Symfony\Component\Process\Process;

public function handle()
{
    $emails = array_fill(0, 10000, 'random@email.com');
    $tasks = [];

    for ($i = 0; $i < count($emails); $i++) {
        $task = new Process(['/usr/bin/php', 'task.php', $emails[$i]]);
        $task->setTimeout(0);//disable timeout
        $task->start(); //start runnning the command asynchronously
        $tasks[] = $task;
    }

    /**
    * Immediately after starting the task as child processes, if we do not
    * have the subsequent code below, this process will terminate and
    * terminate the child processes as well, as they become orphans 😌
    */
    while (count($tasks) > 0) {
        cleanUp($tasks)
    }
}

public function cleanUp(&$tasks)
{
    foreach ($tasks as $i => $task) {
        if (! $task->isRunning()) {
            unset($tasks[$i]); // if task is done, remove it.
        }
    }
}

handle();
```

The code above is sufficient for a small number of tasks, but what about in a case where it's necessary to limit the number of sub-process that can be can be in running state at a time.

```php

<?php

use Symfony\Component\Process\Process;

public function handle()
{
    $emails = array_fill(0, 10000, 'random@email.com');
    $max_child_process = 100;
    $min_child_process = 50;
    $tasks = [];

    for ($i = 0; $i < count($emails); $i++) {
        $task = new Process(['/usr/bin/php', 'task.php', $emails[$i]]);
        $task->setTimeout(0); // disable timeout
        $task->start(); // start runnning the command asynchronously
        $tasks[] = $task;

        /**
        * This will keep the child processes balance between the maximum and
        * minimum, we can tweak this as per needs and system resource
        */
        if (count($tasks) >= $max_child_proces) {
            while (count($tasks) && count($tasks) > $min_child_process) {
                cleanUp($tasks);
            }
        }
    }

    /**
    * Immediately after starting the task as child processes, if we do not
    * have the subsequent code below, this process will terminate and
    * terminate the child processes as well, as they become orphans 😌
    */
    while (count($tasks) > 0) {
        cleanUp($tasks)
    }
}

public function cleanUp(&$tasks)
{
   ...
}

handle();
```

The last consideration is where we are going to run the `worker.php` script this would differ as per need, in this example, we would assume it would be trigger based on a user request in a controller class method.

```php
<?php

class EmailController
{
    public function sendEmails()
    {
        .
        . //do other stuffs
        .
        $process = new Process(['/usr/bin/php', 'worker.php&']);
        $process->setTimeout(0);
        $process->run();
    }
}
```

you would notice that I used `run()` and not `start()` this is to prevent the process from being killed once the controller returns a response to the user, but you might be wondering won't the `run()` block the user from getting a response immediately, that's true but not in this case because of the `&` used at the end of the script name, the `&` instructs the operating system to start the process as a daemon/background/individual process that is not attached to the process that spawned it, so with the `&` the process will be regarded as completed though it is still running and it will not block the main Process from terminating.

> The Symfony Process method described above has been used to process a CSV file with thousand of thousands of rows, calling another API service to get a distinct URL for each row, and sending them individually to another service via its API within minutes.

---

_PS: if you have any questions, or notice any wrong assumptions, feel free to reach out on Twitter [@horllaysco](https://twitter.com/horllaysco)_
