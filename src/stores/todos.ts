import { ref, onMounted } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

interface ITodo {
    text: string;
    complete: boolean;
}

const DEBUGGING = import.meta.env.DEV;

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<ITodo[]>([]);

    function getTodosFromLocalStorage() {
        const savedTodos = localStorage.getItem('todos');

        if (savedTodos === null) {
            if (DEBUGGING) {
                console.warn('No todos saved in localStorage.');
            }
            return;
        }

        // Convert string to object
        todos.value = JSON.parse(savedTodos);

        if (DEBUGGING) {
            console.log('These following values exist in localStorage.');
            console.table(todos.value);
        }
    }

    function saveTodosToLocalStorage() {
        const stringified = JSON.stringify(todos.value);
        localStorage.setItem('todos', stringified);

        if (DEBUGGING) {
            console.log('Saved these following values in localStorage');
            console.table(todos.value);
        }
    }

    function addNewTodo(text: string, complete: boolean): void {
        todos.value.push({ text, complete });

        saveTodosToLocalStorage();
    }

    onMounted(() => {
        getTodosFromLocalStorage();
    });
    return { todos, addNewTodo };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodosStore, import.meta.hot));
}