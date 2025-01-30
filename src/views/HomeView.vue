<script setup lang="ts">
  import { ref } from 'vue';

  const todos = ref<string[]>([]); //Empty array of todo list
  const todoName = ref(''); //User's todo input

  function addTodo() {
    todos.value.push(todoName.value);
  }
</script>

<template>
  <main>
    <input type="text" v-model="todoName" @keyup.enter="addTodo">
    <button @click="addTodo">+</button>
  </main>
</template>