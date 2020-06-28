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

const fetAllTodos = async () => {
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

fetAllTodos();

const displayTodo = () => {

    const todosNodes = todos.map( (todo,index) => {
        if(todo.editMode){
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
        toogleEditMode(index);
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
    span.addEventListener('click', () => {
        toogleTodo(index);
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
        toogleEditMode(index);
    })

    li.append(span, p, btnEdit, btnDelete);
    return li;
}

const addTodo = (message) => {
    todos.push( {
        message,
        done: false,
        editMode: false
    });
    displayTodo();
}

const deleteTodo = (index) => {
    todos.splice(index, 1);
    displayTodo();
}

const toogleTodo = (index) => {
    todos[index].done = !todos[index].done;
    displayTodo();
};

const toogleEditMode = (index) => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

const editTodo = (index, input) => {
    const value = input.value;
    todos[index].message = value;
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

function dateNowFormat(){

    return moment(new Date()).format('DD / MM / YYYY');
}