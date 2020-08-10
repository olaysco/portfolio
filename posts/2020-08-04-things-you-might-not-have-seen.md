---
title: Advanced techniques in Vue to save you development time
date: 2020-08-04
description: Vue.js have some intrinsic part that are not widely known, and not even mentioned in the documentation, knowing some of these can save you time.
tags: [Vue.js, JavaScript]
---

So, you've start to use Vue.js has your desired JavaScript for front-end development and yuo're enjoying it, but now wondering what else is it to now or how to boost your productivity.
In this article we will take a look at some of the secret Vue techniques that can increase your productivity and boost your development flow while following best practices.

1. Smart Watchers -
   Watchers are used in Vue to bind changes in a prop to an handler, such that when the value of a prop changes the handler is triggered

```js
/**
* What does this block of code do?
* When text changes, call fetchData method,
* also call fetchData when the component is created
*/
data(){
  return {
    text: ''
  }
},
watch: {
  text() {
    this.fetchData();
  }
},
created() {
  this.fetchData();
}
```

A simplified way to write our watcher is this

```js
watch: {
  text: 'fetchData'
}
```

we can also make our watcher to be executed immediately, when component is ready and subsequently when prop is mutated

```js
data(){
  return {
    text: ''
  }
},
watch: {
  text: {
    handler: 'fetchData',
    immediate: true
  }
}
```

what if our text data is a deep nested object how do we listen for change if one if its nested properties is mutated, that's where we use the `deep: true` option

```js
data(){
  return {
    text: {
      seach: {
        input: ''
      }
    }
  }
},
watch: {
  text: {
    handler: 'fetchData',
    immediate: true,
    deep: true
  }
}
```

2. Forcing Vue to re-update \<router-view>\</router-view> component, lets say you're navigating from a `products/1` to `products/2`, if Vue detects that the current component is the same with the next component, it doesnt trigger a rerender, rather Vue will only re-use the component and the created/mounted lifecycle wouldnt be triggered on navigation between these routes, one common way I've seen people do this by watching for changes in the \$route object:

```js
watch: {
  $route: {
    handler: 'loadProduct',
    immediate: true,
    deep: true,
  }
}
```

well let's say you prefer to `loadProduct` on `created()`, or for some reasons you require the lifecycle hooks to be retriggered and not just watch for changes in the global \$route object, well there's a way out:

```js
<router-view :key="$route.fullPath"> </router-view>
```

binding the key attribute to the route fullPath will cause a rerender whenever routing occurs,
note: this should be used sparingly.

3. Binding multiple listeners on an element <br>
