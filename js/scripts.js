//Seleções de elementos:
const todoForm = document.querySelector("#form");
const todoInput = document.querySelector("#input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const calcelEdit = document.querySelector("#cancel-edit");
const calcelEditBtn = document.querySelector("#cancel-edit-btn");
const filtrarPorTitulo = document.querySelector("#search")
const filtrarPorStatus = document.querySelector("#filter-select")

let oldInputValue;


//Funções:
const saveTodo = (texto) => {
    const todo = document.createElement("div");
    todo.classList.add("show");

    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = texto;
    todo.appendChild(todoTitle);

    console.log(todoList);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    //Limpar o valor após digitar:
    todoInput.value = "";
    todoInput.focus();
};

const toggleForms = () => {
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".show");

    todos.forEach((todo => {
        let todoTitle = todo.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    }))
};

function selecionando() {
    let select = document.querySelector("#filter-select");
    let options = select.options[select.selectedIndex];
    let value = options.value;

    const todoListArray = Array.from(todoList.children);
    
    let listaExibir = todoListArray.filter((todo) => {
        if(value === 'done') {   
            return todo.classList.contains('done')
        } else if(value ==='todo') {
            return !todo.classList.contains('done')
        } else {
            return true;
        }
    });
    
    listaExibir.forEach(todo => {
        todo.classList.add("show");
        todo.classList.remove("hide");
    });

    let listaOcultar = todoListArray.filter((todo)  => { 
        if(value === 'done'){
            return !todo.classList.contains('done')
        } else if (value === 'todo') {
            return todo.classList.contains('done')
        } else {
            return false;
        }
    });
    
    listaOcultar.forEach(todo => {
        todo.classList.remove("show");
        todo.classList.add("hide")
    })


}

//Eventos:
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue)
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    //Selecionar a div mais próxima ao comando
    const parentEl = targetEl.closest("div");
    //variável pra receber o titulo da edição
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")     //Ao clicar várias vezes irá continuar add classes "done" por isso usa-se toggle no lugar de add
    }

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

calcelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        //atualizar
        updateTodo(editInputValue);
    }

    toggleForms();
});

filtrarPorTitulo.addEventListener("input", event => {
    const inputValuePesquisa = event.target.value.trim().toLowerCase();
    Array.from(todoList.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(inputValuePesquisa))
    .forEach(todo => {
        todo.classList.remove("show");
        todo.classList.add("hide")
    })
    Array.from(todoList.children)
    .filter(todo => todo.textContent.toLowerCase().includes(inputValuePesquisa))
    .forEach(todo => {
        todo.classList.add("show");
        todo.classList.remove("hide");
    })
});

