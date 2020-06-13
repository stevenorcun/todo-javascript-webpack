import './style.css'
const moment = require('moment');

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

const todos = [
    {
        text: 'faire RXJS',
        done: false,
        editMode: false
    },
    {
        text: 'faire Javascript',
        done: true,
        editMode: false
    }
]

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
    input.type = 'text';
    input.value = todo.text;

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

    p.innerHTML = todo.text;
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

const addTodo = (text) => {
    todos.push( {
        text,
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
    todos[index].text = value;
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

displayTodo();

function dateNowFormat(){

    return moment(new Date()).format('DD / MM / YYYY');
}