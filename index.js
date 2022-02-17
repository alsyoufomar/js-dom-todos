const ul = document.getElementById('todo-list')
const form = document.querySelector('.form')

function init () {
    fetch("http://localhost:3000/todos")
        .then(res => res.json())
        .then(x => addTodos(x))
}

init()

function addTodos (todos) {
    todos.forEach(todo => addTodo(todo))
}

function addTodo (todo) {
    const container = document.createElement('div')
    const li = document.createElement('li')
    const span = document.createElement('span')
    const cmpBtn = document.createElement('button')
    const delBtn = document.createElement('button')
    cmpBtn.classList.add('btn')
    delBtn.classList.add('btn')
    delBtn.innerText = 'Delete'
    delBtn.addEventListener('click', () => {
        fetch("http://localhost:3000/todos/" + todo.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => li.remove())
    })
    cmpBtn.addEventListener('click', () => {
        const updatedTodo = { completed: !todo.completed }
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        }
        fetch("http://localhost:3000/todos/" + todo.id, options)
            .then(() => {
                todo.completed = updatedTodo.completed
                if (todo.completed) {
                    li.classList.add('completed')
                    cmpBtn.innerText = 'uncomplete'
                }
                else {
                    li.classList.remove('completed')
                    cmpBtn.innerText = 'completed'
                }

            })
    })
    if (todo.completed) {
        li.classList.add('completed')
        cmpBtn.innerText = 'uncomplete'
    }
    else {
        li.classList.remove('completed')
        cmpBtn.innerText = 'completed'
    }



    container.classList.add('todo-container')
    span.innerText = todo.title

    container.append(cmpBtn, span, delBtn)
    li.append(container)
    ul.append(li)
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
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

