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
    <div class="catch-phrase">
      <img src="@/assets/images/froggy-think.png" alt="An animated frog thinking" width="500" height="400" />
      <p>What's your plan for today?🎈</p>
    </div>

    <div class="todo-container">
      <div class="todo-input-container">
        <input placeholder="enter your task here" type="text" v-model="todoName" @keyup.enter="addTodo" />
        <img
          src="@/assets/images/you-can-do-it.png"
          alt="A sticky note with the text: you can do it"
          width="500"
          height="500"
        />
      </div>

      <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
      <div class="todo-item" v-if="todos.length > 0" v-for="(todo, index) in todos" :key="index">
        <SingleTodo :todo-text="todo.text" :complete="todo.complete" :id="todo.id" @taskCompleted="onTaskCompleted" />
      </div>
    </div>
    <p v-if="showCompletedMsg">Nice job, keep going!🔥</p>
  </main>
</template>