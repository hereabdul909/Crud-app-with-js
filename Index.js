//Time and Date
const time_day = () => {
    const dt = new Date();
    document.getElementById('date').innerHTML = dt.toLocaleString();
}
time_day();
setInterval(time_day, 1000);

//theme
const darkBtn = document.getElementById('darkBtn');
const lightBtn = document.getElementById('lightBtn');
const body = document.body;
// Function to set the theme
const setTheme = (theme) => {
    if (theme === 'light') {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }
};
// Check local storage for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}
darkBtn.addEventListener('click', () => {
    setTheme('dark');
});

lightBtn.addEventListener('click', () => {
    setTheme('light');
});

//todo list 
const toDoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.todo-btn')
const toDoList = document.querySelector('.todo-list');
// Event Listeners

addBtn.addEventListener('click', e => {
    e.preventDefault();
    if (toDoInput.value === '') {
        alert('Please Add something before click on add button!')
    } else {
        //make div
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('todo');
        mainDiv.draggable = 'true';
        mainDiv.addEventListener('click',()=>{
            console.log('hello')
        })
        //add li in div
        const Li = document.createElement('li');
        Li.innerText = toDoInput.value;

        mainDiv.appendChild(Li);
        //save to localstrage
        savelocal(toDoInput.value);

        //add some btns in div
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('btn-div')
        //check btn
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn');
        btnDiv.appendChild(checked);
        checked.addEventListener('click', () => {
            const checkParent = checked.parentElement
            checkParent.parentElement.classList.toggle("completed");
        })
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn');
        btnDiv.appendChild(deleted);
        deleted.addEventListener('click', () => {
            const delParent = deleted.parentElement;
            delParent.parentElement.remove();
            removefromLocalStarage(delParent.parentElement);
        })
        // edit btn;
        const edit = document.createElement('button');
        edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        edit.classList.add('edit-btn');
        btnDiv.appendChild(edit);
        edit.addEventListener('click', () => {
            toDoInput.value = Li.innerText;;
            const editParent = edit.parentElement;
            editParent.parentElement.remove();
        })
        //append in the divs
        mainDiv.appendChild(btnDiv);
        toDoList.appendChild(mainDiv);
        //clear after add item
        toDoInput.value = '';
    }
})
  
function savelocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

window.onload = function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {

        const mainDiv = document.createElement('div');
        mainDiv.classList.add('todo');
        mainDiv.draggable = true;
        const Li = document.createElement('li');

        Li.innerText = todo;
        Li.classList.add('todo-item');
        mainDiv.appendChild(Li)
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('btn-div')

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn');
        btnDiv.appendChild(checked);
        checked.addEventListener('click', () => {
            const checkParent = checked.parentElement
            checkParent.parentElement.classList.toggle("completed");
        })

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn');
        btnDiv.appendChild(deleted);
        deleted.addEventListener('click', () => {
            const delParent = deleted.parentElement;
            delParent.parentElement.remove(delParent);
        })

        const edit = document.createElement('button');
        edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        edit.classList.add('edit-btn');
        btnDiv.appendChild(edit);
        edit.addEventListener('click', () => {
            toDoInput.value = Li.innerText;;
            const editParent = edit.parentElement;
            editParent.parentElement.remove();
        })

        mainDiv.appendChild(btnDiv);
        toDoList.appendChild(mainDiv);
    });
}
function removefromLocalStarage(del_List) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todos.indexOf(del_List.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// drag and drop

