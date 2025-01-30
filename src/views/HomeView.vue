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
    <div>
      <p v-if="todos.length === 0">You’re free as a bird! 🕊️
        <br>Time to relax or do something fun! 🎉</p>
        
      <ul v-if="todos.length > 0">
        <li v-for="(todo, index) in todos" :key="index">
          {{  todo }}
        </li>
      </ul>
    </div>
  </main>
</template>