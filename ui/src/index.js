import './style.css'
const moment = require('moment');

// Data for all application
const baseURL = 'http://localhost:3000/api/todos';
let todos = [];

// Targeted elements for the application
const h3 = document.querySelector('h3');
const ul = document.querySelector('ul');
const input = document.querySelector('form > input');
const form = document.querySelector('form');

// Display date on the title
const dateNow = document.createTextNode(dateNowFormat());
h3.appendChild(dateNow);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = '';
    addTodo(value);
})

// GET all todos from the backend
const fetchAllTodos = async () => {
    try{
        const response = await fetch(baseURL);
        const data = await response.json();
        if(data.error) return;
        todos = data;
        console.log(todos);
        displayTodo();
    }catch(e){
        console.log(e);
    }
}

fetchAllTodos();

// Display todo in the view
const displayTodo = () => {

    const todosNodes = todos.map( (todo,index) => {
        if(todo.isEditMode){
            return createTodoEditElement(todo, index);
        }
        return createTodoElement(todo, index);
    })

    ul.innerHTML = '';
    ul.append(...todosNodes);
}

// Create todo element for the view in edit mode
const createTodoEditElement = (todo, index) =>{
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'message';
    input.value = todo.message;

    const btnSave = document.createElement('button');
    btnSave.innerHTML = 'Save';
    btnSave.className = 'btn-blue';
    btnSave.addEventListener('click', (event) => {
        event.stopPropagation();
        editTodo(todo, input.value);
    })

    const btnCancel = document.createElement('button');
    btnCancel.innerHTML = 'Cancel';
    btnCancel.className = 'btn-red';
    btnCancel.addEventListener('click', (event) => {
        event.stopPropagation();
        toogleIsEditMode(todo);
    })

    li.append(input, btnSave, btnCancel);
    return li;
}

// Create todo element for the view in normal mode
const createTodoElement = (todo, index) => {
    const li = document.createElement('li');
    const btnDelete = document.createElement('button');
    const btnEdit = document.createElement('button');
    const span = document.createElement('span');
    const p = document.createElement('p');

    p.innerHTML = todo.message;
    span.className = todo.done ? 'todo done': 'todo';
    span.dataset.id = todo._id;
    span.addEventListener('click', () => {
        toogleTodo(todo);
    });

    btnDelete.className = 'btn-red';
    btnDelete.innerHTML = 'Supprimer';
    btnDelete.addEventListener('click', () =>{
        // CLOSURE.
        // Accès à index une fois createTodoElement() terminée
        deleteTodo(todo);
    });
    
    btnEdit.className = 'btn-green';
    btnEdit.innerHTML = 'Editer';
    btnEdit.addEventListener('click', (event) => {
        toogleIsEditMode(todo);
    })

    li.append(span, p, btnEdit, btnDelete);
    return li;
}

// POST a new todo in DB
const addTodo = async (message) => {
    try {
        let todoJson = JSON.stringify({ done: false, isEditMode: false, message});
        const response = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: todoJson
        });
        fetchAllTodos();
    } catch (error) {
        console.log(error);
    }
}

// DELETE todo in db
const deleteTodo = async (todo) => {
    try {
        const response = await fetch(`${baseURL}/${todo._id}`, {
            method: 'DELETE'
        });
        const body = await response.json();
        fetchAllTodos();
    } catch (error) {
        console.log(error);
    }
}

// PUT the field 'done' in DB
const toogleTodo = async (todo) => {
    try {
        todo.done = !todo.done;
        const response = await fetch(`${baseURL}/${todo._id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(todo)
        });
        fetchAllTodos();
    } catch (error) {
        console.log(error);
    }
};

// PUT the field 'isEditMode' in DB
const toogleIsEditMode = async (todo) => {
    try {
        todo.isEditMode = !todo.isEditMode;
        const response = await fetch(`${baseURL}/${todo._id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(todo)
        });
        fetchAllTodos();
    } catch (error) {
        console.log(error);
    }
}

// PUT the field 'message' in DB
const editTodo = async (todo, value) => {
    try {
        todo.message = value;
        todo.isEditMode = !todo.isEditMode;
        let todoJson = JSON.stringify(todo);
        const response = await fetch(`${baseURL}/${todo._id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: todoJson
        });
        fetchAllTodos();
    } catch (error) {
        console.log(error);
    }
}

// Method that returns today's date in custom format
function dateNowFormat(){

    return moment(new Date()).format('DD / MM / YYYY');
}