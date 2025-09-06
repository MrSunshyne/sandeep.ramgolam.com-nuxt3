<template>
  <div>
    <h1>Checker is rendereded in vue</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>

<script setup lang="ts">

const counter = ref(0)

const increment = () => {
  counter.value++
}

const decrement = () => {
  counter.value--
}
</script>