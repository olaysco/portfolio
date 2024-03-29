---
title: How to Add Retries to External API Calls in PHP
date: 2021-04-24
description: When making HTTP API calls to external or third-party systems, failures may occur due to issues with the server connection or any intermediate hops in-between, this article explains how to implement custom Retry logic using the Exponential Back-off Algorithm.
tags: [Laravel, PHP, API, Best Practices]
cover: http-give-up.gif
published: true
---

> Life is full of mountains, Some are big and some are small, But if you don’t give up, you will overcome all. - Anonymous

API calls to external endpoints are one of the integral parts of web applications, and this comes at a cost as they can fail at any point of the transmission. the failure can be caused by downtime in the receiving server end, invalid client request or even the most popular one when sending data to a public API that is exceeding the rate limit or just some random errors, at any point these failures occur during API communication, being aware or handling this errors is not enough, a more proactive action might just be to retry the request.

In this article we would look at how to add retries to API requests in PHP using the Exponential Back-off Algorithm, which can be used to progressively increase the time between each retry:

**Retry Algorithm**

```md
1. make request to endpoint
2. if request succeds, continue
3. if request fails and total_attempts is greater or equal to maximum_retry, continue
4. else increase total_attempts by 1
5. wait for maximum_retry \* total_attempts
6. goto step 1
```

Learn more about Exponential Back-off [here](https://en.wikipedia.org/wiki/Exponential_backoff)

### **Exponentail Back-off in action**

Though for this article we will implement the Exponential Back-off retry in PHP, this algorithm can be implemented in any language.

First, let's look at a simple **doRequest()** function that sends POST request to an endpoint:

```php
public function doRequest(string $url, array $options): Array
{
    try {
        $res = $this->client->post($url, $options);
        return json_decode($res->getBody());
    } catch (\Exception $e) {
        Log::info("Fail because of ".$e->getMessage()
        return [];
    }
}
```

Given that our request is likely to fail for a variety of reasons, we want to retry the request before giving up:

```php
public function doRequest($url, $options): Array
{
    $backOff = false;
    $backOffLimit = 20;
    $backOffRetry = 0;

    do {
        try {
            $backOff = false;
            $res = $this->client->post($url, $options);
            return json_decode($res->getBody());
        } catch (\Exception $e) {
            if ($backOffRetry >= $backOffLimit) {
                Log::info("Fail because of ".$e->getMessage()." after $backOffLimit");
                return [];
            }
            $backOff = true;
            $backOffRetry++;
            sleep($backOffRetry * 2);
        }
    } while ($backOff);
}

```

The implementation can be improved further to allow the **doRequest()** function caller to have more control over maximum retries and for what status code to retry, as the current implementation retires the request irrespective of the response status code:

```php

public function doRequest($url, $options, $maxRetry = 5, $statusToRetry = [500, 503] ): Array
{
    $backOff = false;
    $backOffLimit = $maxRetry;
    $backOffRetry = 0;

    do {
        try {
            $backOff = false;
            $res = $this->client->post($url, $options);
            return json_decode($res->getBody());
        } catch (\Exception $e) {
            $isRetryableStatus = in_array($e->status, $statusToRetry);
            if ($backOffRetry >= $backOffLimit || !$isRetryableStatus) {
                Log::info("Fail because of ".$e->getMessage()." after $backOffLimit");
                return [];
            }
            $backOff = true;
            $backOffRetry++;
            sleep($backOffRetry * 2);
        }
    } while ($backOff);
}
```

**Key Takeaways**

- The do-while loop allows us to try the request at least once, this could have also been a recursive function.
- The implementation described in this article can be applied to any HTTP request library if it doesn't have the retry functionality or if you decide to handle the retry your way.

---

_PS: if you have any questions, or notice any wrong assumptions, feel free to reach out on Twitter [@horllaysco](https://twitter.com/horllaysco)_
