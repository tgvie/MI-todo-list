import { ref, onMounted } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

interface ITodo {
    id: number;
    text: string;
    complete: boolean;
}

const DEBUGGING = import.meta.env.DEV;
const nextID = ref(0);

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

        // Find the max id in todos to increase that id
        nextID.value = Math.max(...todos.value.map(todo => todo.id));

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
        nextID.value += 1;
        todos.value.push({ id: nextID.value, text, complete });

        saveTodosToLocalStorage();
    }

    function toggleTodoState(id: number, isDone: boolean): void {
        const item = todos.value.find(todo => todo.id === id);
        if (item) {
            item.complete = isDone;
            saveTodosToLocalStorage();
        }
    }

    // Load all todos when the app starts for the first time
    onMounted(() => {
        getTodosFromLocalStorage();
    });

    return { todos, addNewTodo, toggleTodoState };
});

// Uses while developing so that changes written to this file are applied immediately so we don't need to refresh the browser
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodosStore, import.meta.hot));
}