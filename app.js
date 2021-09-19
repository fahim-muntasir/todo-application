// selector all
const inputTodo = document.querySelector('.inputTodo');
const addTodo = document.querySelector('button[type="submit"]');
const allTodos = document.querySelector('.todos');
const editButton = document.querySelector('.edit-button');
const deleteButton = document.querySelector('.delete-button');

// all events
window.addEventListener('DOMContentLoaded', showAllListOnLoaded);
addTodo.addEventListener('click', addTodoItem);

// all function
let countId; // list number count

function countValue(){
    const localStorageDataCount = JSON.parse(localStorage.getItem('todos'));
    if ( localStorageDataCount.length === 0 ) {
        countId = 0;
    } else {
        countId = localStorageDataCount.length;
    }
}

function addTodoItem(e){
    e.preventDefault();
    const currentDataId = inputTodo.getAttribute('data-id');
    if (!currentDataId) {
        // add todo list
        countId ++;
        // create div
        const singleTodo = document.createElement('div');
        singleTodo.className = 'todo-list';
        // create todo list
        const todoItem = document.createElement('li');
        const todoText = inputTodo.value;
        todoItem.className = 'todo-item';
        todoItem.dataset.id = countId;
        todoItem.innerText = todoText;
        singleTodo.appendChild(todoItem);
        // create edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-button';
        editBtn.onclick = todoEdit;
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        singleTodo.appendChild(editBtn);
        // create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.onclick = todoDelete;
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        singleTodo.appendChild(deleteBtn);

        // input todo list
        allTodos.appendChild(singleTodo);
        // save value on localstore        
        saveValueOnLocalstore(inputTodo.value);
        // clear input todo 
        inputTodo.value = '';
        
    } else {
        // edit todo list
        editTodoList(currentDataId);
    }
    countValue();
}

// first process of edit todo list
function todoEdit(e){
    const targetList = e.target.parentElement.querySelector('li');
    inputTodo.value = targetList.innerText;
    inputTodo.focus();
    inputTodo.dataset.id = targetList.getAttribute('data-id');
}

// delete todo list
function todoDelete(e){
    const deleteElement = e.target.parentElement;
    deleteElement.classList.add('animationDelete');
    // delete to local store
    deleteToLocalStore(deleteElement.querySelector('li').getAttribute('data-id'));
    deleteElement.addEventListener('transitionend', () => {
        deleteElement.remove();
        const allLI = document.querySelectorAll('li');
        allLI.forEach((e, i) => {
            e.dataset.id = i + 1;
        })
        countValue();
    })

}

// edit Todo List
function editTodoList(currentDataId) {
    const todoListAll = document.querySelectorAll('.todos li'); 
        todoListAll.forEach((element) => {
            const todoListId = element.getAttribute('data-id');
            if (todoListId === currentDataId) {
                element.innerText = inputTodo.value;
                // local store todos check
                let todos;
                let getLocalstoreTodos = localStorage.getItem('todos');
                if (!getLocalstoreTodos) {
                    todos = [];
                } else {
                    todos = JSON.parse(getLocalstoreTodos);
                }
                todos.splice(currentDataId -1, 1, inputTodo.value);
                localStorage.setItem('todos', JSON.stringify(todos));
                inputTodo.value = '';
                inputTodo.removeAttribute('data-id');
            }
        })
}

// save value on local store
function saveValueOnLocalstore(value) {
    let todos;
    const localStoreData = localStorage.getItem('todos');
    if (!localStoreData) {
        todos = [];
    } else {
        todos = JSON.parse(localStoreData);
    }
    todos.push(value);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// delete to local store
function deleteToLocalStore(index) {
    let todos;
    const localStoreData = localStorage.getItem('todos');
    if (!localStoreData) {
        todos = [];
    } else {
        todos = JSON.parse(localStoreData);
    }

    todos.splice(index -1, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// show all todo list on loaded
function showAllListOnLoaded(){
    let todos;
    const localStoreData = localStorage.getItem('todos');
    if (!localStoreData) {
        todos = [];
    } else {
        todos = JSON.parse(localStoreData);
    }

    // count todo list
    let count = 0;
    todos.forEach((element) => {
        count ++;
        // create div
        const singleTodo = document.createElement('div');
        singleTodo.className = 'todo-list';
        // create todo list
        const todoItem = document.createElement('li');
        const todoText = element;
        todoItem.className = 'todo-item';
        todoItem.dataset.id = count;
        todoItem.innerText = todoText;
        singleTodo.appendChild(todoItem);
        // create edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-button';
        editBtn.onclick = todoEdit;
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        singleTodo.appendChild(editBtn);
        // create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.onclick = todoDelete;
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        singleTodo.appendChild(deleteBtn);

        // input todo list
        allTodos.appendChild(singleTodo);
    })
    countValue();
}

