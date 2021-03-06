---
title: Vue.js techniques to save you development time
date: 2020-08-04
description: Vue.js have some intrinsic part that are not widely known, and not even mentioned in the documentation, knowing some of these can save you time.
tags: [Vue.js, JavaScript]
cover: advanced-vue.png
published: true
---

So, you've start to use Vue.js has your desired JavaScript framework for front-end development and you're enjoying it, but now wondering what else is it to know or how to boost your productivity.
In this article we will take a look at some of the secret Vue techniques that can increase your productivity and boost your development flow while following best practices.

1. **Smart Watchers**: <br>
   Watchers are used in Vue to bind changes in a prop to an handler, such that when the value of a prop changes the handler is triggered

```js
/**
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

2. **Forcing Vue to re-update \<router-view>\</router-view> component**: <br>
   lets say you're navigating from route `products/1` to `products/2`, if Vue detects that the current component is the same with the next component, it doesnt trigger a re-render, rather Vue will only re-use the component and the created/mounted lifecycle wouldn't be triggered on navigation between these routes, one common way I've seen people do this is by watching for changes in the \$route object:

```js
watch: {
  $route: {
    handler: 'loadProduct',
    immediate: true,
    deep: true,
  }
}
```

well let's say you prefer to call `loadProduct` on `created()`, or for some reasons you require the lifecycle hooks to be re-triggered and not just watch for changes in the global \$route object, well there's a way out:

```js
<router-view :key="$route.fullPath"> </router-view>
```

binding the key attribute to the route fullPath will cause a rerender whenever routing occurs,
note: this should be used sparingly.

3. **Binding multiple listeners on an element**: <br>
   Vue allows us to bind an event to an element using the `v-on` directive or through the `@` shprthand, there are cases you want an element to respond to multiple events and you still want to keep yor code clean, so let's say we have this piece of code :

```vue
<template>
  <div>
    <button @click="btnCliked" @dblclick="btnDblClicked" @hover="btnHover">
      espree
    </button>

    <button @click="btnCliked" @dblclick="btnDblClicked" @hover="btnHover">
      espree 2
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    btnClicked() {
      console.log('am clicked')
    },
    btnDblClicked() {
      console.log('am double clicked')
    },
    btnHover() {
      console.log('am hover')
    }
  }
}
</script>
```

from this we can ee that the two button share the same event and it would increase the code maintainablity if we can combine these events into one.

```vue
<template>
  <div id="app">
    <button v-on="listeners">espree</button>
    <button v-on="listeners">espree 2</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    listeners() {
      return {
        click: this.btnClicked,
        dblclick: this.btnDblClicked,
        focus: this.btnFocus
      }
    }
  },
  methods: {
    btnClicked() {
      console.log('am clicked')
    },
    btnDblClicked() {
      console.log('am double clicked')
    },
    btnFocus() {
      console.log('am focused')
    }
  }
}
</script>
```

4. **Dynamic Listeners on child component**: <br>
   Using what we learnt from the previous tips, we can also extend this to how we pass listeners to child componenets. by default vue passes listeners on a component to its root element, if we have the following code

```vue
<!-- BaseInput.vue -->
<template>
  <div>
    <input class="input" @input="$emit('input', $event.target.value)" />
  </div>
</template>

<BaseInput @focus="handleFocus" />
```

the focus event here is bind to the div root element which is not what we want, to overide this you can bind the listener to the input directly by using the v-on attributes to listen on all the event listeners passed to the component.
Quick note- the `this.$listiners` property is an object containing all the event listeners passed to a component, equipped with that knowledge let's refactor our code

```vue
<!-- BaseInput.vue -->
<template>
  <div>
    <input class="input" v-on="listeners" />
  </div>
</template>
<script>
export default {
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: () => $emit('input', $event.target.value)
      }
    }
  }
}
</script>

<BaseInput @focus="handleFocus" />
```

now we can pass as many events as we want to the Base Input and the events would be binded to the root input element.

5. **Dynamic attrributes**: <br>
   In Vue attributes declared on an element if not declared as a prop is automatically inherited by the root element of the component, so let's say we have this

```vue
<!-- BaseInput.vue -->
<template>
  <div>
    <input class="input" />
  </div>
</template>

<BaseInput placeholder="email" />
```

the placeholder attributes here would be inherited by the root div element, hence not having the intended consequence which is the input element having the placeholder, to overcome this let's refactor our code.

```vue
<!-- BaseInput.vue -->
<template>
  <div>
    <input v-bind="$attrs" class="input" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<BaseInput placeholder="email" />
```

There are two things to note here first is the `$attrs` this is an object similar to `$listeners` it contains all the attributes declared on the component, he second is the `inheritAttrs`, by seeting it to false we are telling Vue not to automatically bind attributes passed to it to the root element, this allow us to bind the attributes - `$attrs` the way we want.

Yeah, I hope you find these tips helpful and will help improve your reduce your development time.
