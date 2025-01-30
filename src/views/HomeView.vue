<script setup lang="ts">
import { ref } from 'vue';
import SingleTodo from '@/components/SingleTodo.vue';
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';

const todoStore = useTodosStore();
const { todos } = storeToRefs(todoStore);

const todoName = ref(''); //User's todo input

function addTodo() {
  if (todoName.value.trim() === '') return; //Check for empty inputs
  todoStore.addNewTodo(todoName.value, false);
  todoName.value = ''; //Clear input upon adding
}
</script>

<template>
  <main>
    <input type="text" v-model="todoName" @keyup.enter="addTodo" />
    <button @click="addTodo">+</button>
    <div>
      <p v-if="todos.length === 0">You’re free as a bird! 🕊️ 
        <br>Time to relax or do something fun! 🎉</p>

      <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
      <div v-if="todos.length > 0" v-for="(todo, index) in todos" :key="index">
        <SingleTodo :todo-text="todo.text" :complete="todo.complete" />
      </div>
    </div>
  </main>
</template>
