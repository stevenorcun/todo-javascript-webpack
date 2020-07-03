import './style.css'
const moment = require('moment');

const baseURL = 'http://localhost:3000/api/todos/';

const h3 = document.querySelector('h3');
const ul = document.querySelector('ul');
const input = document.querySelector('form > input');
const form = document.querySelector('form');

const dateNow = document.createTextNode(dateNowFormat());
h3.appendChild(dateNow);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = '';
    addTodo(value);
})

let todos = [];

const fetchAllTodos = async () => {
    try{
        const response = await fetch(baseURL);
        const data = await response.json();
        todos = data;
        console.log(todos);
        displayTodo();
    }catch(e){
        console.log(e);
    }
}

fetchAllTodos();

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
        editTodo(index, input);
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
        deleteTodo(index);
    });
    
    btnEdit.className = 'btn-green';
    btnEdit.innerHTML = 'Editer';
    btnEdit.addEventListener('click', (event) => {
        toogleIsEditMode(todo);
    })

    li.append(span, p, btnEdit, btnDelete);
    return li;
}

const addTodo = (message) => {
    todos.push( {
        message,
        done: false,
        isEditMode: false
    });
    displayTodo();
}

const deleteTodo = (index) => {
    todos.splice(index, 1);
    displayTodo();
}

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

const editTodo = (index, input) => {
    const value = input.value;
    todos[index].message = value;
    todos[index].isEditMode = !todos[index].isEditMode;
    displayTodo();
}

function dateNowFormat(){

    return moment(new Date()).format('DD / MM / YYYY');
}