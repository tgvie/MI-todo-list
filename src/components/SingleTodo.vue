<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '@/stores/todos';

const props = defineProps({
    id: { type: Number, required: true },
    todoText: { type: String, required: true },
    complete: { type: Boolean, default: false}
});

const emit = defineEmits(['taskCompleted']);
const todoStore = useTodosStore();
const isDone = ref(props.complete);

function toggleDoneState() {
    isDone.value = !isDone.value;

    if (isDone.value) {
        emit('taskCompleted');
    }

    todoStore.toggleTodoState(props.id, isDone.value);
}
</script>

<template>
  <p :class="{ completed: isDone }">
    {{ todoText }}
    <button @click="toggleDoneState">
      <span v-if="isDone">Undone</span>
      <span v-if="!isDone">Done</span>
    </button>
  </p>
</template>