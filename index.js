const ul = document.getElementById('todo-list')
const form = document.querySelector('.form')

function init () {
    fetch("http://localhost:3000/todos")
        .then(function (res) {
            console.log(res)
            return res.json()
        })
        .then(x => addTodos(x));
}

init()

function addTodos (todos) {
    todos.forEach(todo => addTodo(todo))
}

function addTodo (todo) {
    const li = document.createElement('li')
    li.innerText = todo.title
    ul.append(li)
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(form.title.value)
    const todo = {
        title: form.title.value,
        "completed": false
    }
    form.title.value = ''

    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(todo)
    }).then(res => res.json())
        .then(todo => addTodo(todo))
})

form.reset()

