const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUl = document.getElementById('todos')


// Adding local storage 
const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
  todos.forEach(todo => addTodo(todo))
} 

// e = event object as argument.
// Step 1: Prevent the form from having its default behaviour and step to add a to do 

form.addEventListener('submit', (e) => {
  e.preventDefault()

  addTodo()
})

function addTodo(todo) {
  let todoText = input.value 

 //  if a todo is passed in 
  if(todo) {
    todoText = todo.text
  }

 //  construct a list item. If there is todo text then create a list item 

 if(todoText) {
   const todoEl = document.createElement('li')
   if(todo && todo.completed) {
     todoEl.classList.add('completed')
   }

   todoEl.innerText = todoText

   // mark as completed and remove from local storage once added  
   todoEl.addEventListener('click', () => {
     todoEl.classList.toggle('completed')
     updateLocalStorage()
    })

   // Enables right clicking to remove the item. contextmenu = rightclick
   todoEl.addEventListener('dblclick', (e) => {

     todoEl.remove()
     updateLocalStorage()
    })

   // add todo the dom 
   todosUl.prepend(todoEl)
   
   // set the input to blank
   input.value = ''

   updateLocalStorage()
 }
}

function updateLocalStorage() {
  todosEl = document.querySelectorAll('li')

  const todos = []

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText, 
      completed: todoEl.classList.contains('completed')
    }) 
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}