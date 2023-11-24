const toDoForm = document.querySelector("#todo-form")
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.querySelector("#todo-list")

const TODOS_KEY = "todos"

let toDos = []

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos))
}

function deleteToDo(event){
    const li = event.target.parentElement
    localStorage.removeItem(TODOS_KEY,li.id)
    li.remove()
    
}

function paintToDo(newTodo){
    const li = document.createElement("li")
    li.id = newTodo.id
    const span = document.createElement("span")
    span.innerText = newTodo.text
    const button = document.createElement("button")
    button.innerText = ("Θ")
    button.addEventListener("click",deleteToDo)
    li.appendChild(span)
    li.appendChild(button)
    toDoList.appendChild(li)
}

function handleToDosubmit(event){
    event.preventDefault()
    const newTodo = toDoInput.value
    toDoInput.value = ""
    const newTodoObj = {
        text:newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj)
    paintToDo(newTodoObj)
    saveToDos()
}

toDoForm.addEventListener("submit",handleToDosubmit)




const savedToDos = localStorage.getItem(TODOS_KEY)
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos)
    toDos = parsedToDos
    toDos.forEach(paintToDo)
}
