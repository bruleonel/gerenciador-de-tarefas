//Seleções de elementos:
const todoForm = document.querySelector("#form");
const todoInput = document.querySelector("#input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const tcalcelEdit = document.querySelector("#cancel-edit");

//Funções:
const saveTodo = (texto) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")
}

//Eventos:
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue)
    }
});