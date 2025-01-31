<script setup lang="ts">
import { ref } from 'vue';
import SingleTodo from '@/components/SingleTodo.vue';
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';

const todoStore = useTodosStore();
const { todos } = storeToRefs(todoStore);
const todoName = ref(''); //User's todo input
const showCompletedMsg = ref(false);

function addTodo() {
  if (todoName.value.trim() === '') return; //Check for empty inputs
  todoStore.addNewTodo(todoName.value, false);
  todoName.value = ''; //Clear input upon adding
}

function onTaskCompleted() {
  showCompletedMsg.value = true;
  setTimeout(clearMsg, 2000);
}

function clearMsg() {
  showCompletedMsg.value = false;
}
</script>

<template>
  <main>
    <input type="text" v-model="todoName" @keyup.enter="addTodo" />
    <button @click="addTodo">+</button>

    <p v-if="todos.length === 0">What's your plan for today?🎈</p>

    <div>
      <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
      <div v-if="todos.length > 0" v-for="(todo, index) in todos" :key="index">
        <SingleTodo :todo-text="todo.text" :complete="todo.complete" :id="todo.id" @taskCompleted="onTaskCompleted" />
      </div>

      <p v-if="showCompletedMsg">You just finished a task, keep going!🔥</p>
    </div>
  </main>
</template>
