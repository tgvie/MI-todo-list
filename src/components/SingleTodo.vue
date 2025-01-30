<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    todoText: { type: String, required: true },
    complete: { type: Boolean, default: false}
});

const isDone = ref(props.complete);

function toggleDoneState() {
    isDone.value = !isDone.value;
}
</script>

<template>
  <div :class="{ completed: isDone }">
    {{ todoText }}
    <button @click="toggleDoneState">
        <span v-if="isDone">Undone</span>
        <span v-if="!isDone">Done</span>
    </button>
  </div>
</template>