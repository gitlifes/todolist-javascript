let items = [{id: 0, title:'delectus aut autem', done: false}, 
{id: 1, title:'quis ut nam facilis et officia qui', done: false},
{id: 2, title:'fugiat veniam minus', done: false},
{id: 3, title:'et porro tempora', done: false},
{id: 4, title:'laboriosam mollitia et enim quasi adipisci quia provident illum', done: false},
{id: 5, title:'qui ullam ratione quibusdam voluptatem quia omnis', done: false},
{id: 6, title:'illo expedita consequatur quia in', done: true},
{id: 7, title:'quo adipisci enim quam ut ab', done: false},
{id: 8, title:'molestiae perspiciatis ipsa', done: false},
{id: 9, title:'illo est ratione doloremque quia maiores aut', done: false}]

let active
let sortTodo = 'normal'

function activeButton(button) {
  if(active) {
    active.classList.remove('active')
  }
  active = button
  button.classList.add('active')
}

function sortButtonHandler() {
  let butt = document.querySelector(".dropdown-toggle")
  let ul = document.querySelector('.dropdown-menu')  
  if (butt.classList.contains('show')) {
    butt.classList.remove('show')
    ul.classList.remove('show')
  } else {
    butt.classList.add('show')
    ul.classList.add('show')
  }
}

function alphabetical(a, b) {
  if ( a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1;
  }
  if ( a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return 0;
}

class Todo {

  constructor(active) {
    this.active = active
  }
  
  checkBox(val) {
    let check = document.createElement("input");
    check.type = "checkbox"
    check.id = "flexCheckDefault"
    check.value = ""
    check.className = "form-check-input"
    check.style.marginRight = "1rem"
    if(val) {
      check.checked = true
    }    
    check.onchange = (event) => {
      let id = event.target.parentElement.dataset.key - 0
      items = items.map((item) => {
        if(item.id === id) {
          return {...item, done: event.target.checked}
        }
        return item
      })
      this.createTodos()
    } 
    return check
  } 

  title(todo) {
    let elem = document.createElement("div");
    elem.innerHTML = todo.title;
    elem.className = 'title'
    return elem
  } 

  closeButton() {
    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn-close";
    button.ariaLevel = "Close";
    button.onclick = (event) => {
      this.deleteTodo(event.target.parentElement)
    }
    return button
  } 

  createTodos() {
    let newItem = document.querySelector(".todo");
    newItem.innerHTML = ""
      let count = 1
      let arr = [...items]
      arr = this.filterFunc(arr)
      this.sortFunc(arr)
    for (let todo of arr) {
      let div = document.createElement('div')
      div.className = 'row'
      div.dataset.key = todo.id
      let check = this.checkBox(todo.done)
      let text = this.title(todo)
      let button = this.closeButton()
      div.append(check)
      div.append(count)
      div.append(text)
      div.append(button)
      newItem.append(div)
      count++
    }
    return newItem
  }

  addTodo(str) {
    if(str){
      items = [...items, {id: items.length + 1, title: str, done: false}]
      this.createTodos(items)
    }
  }

  deleteTodo(elem) {
    let id = elem.dataset.key
    items = items.filter((item) => item.id != id)
    this.createTodos(items)
  }

  sortFunc(array) {
    switch(sortTodo) {
      case 'alphabetical':
        array.sort(alphabetical)
        break
      case 'random':
        array.sort((a, b) => 0.5 - Math.random())
        break
      case 'normal':
        array.sort((a, b) => {return 0})
        break
    }
  }

  filterFunc(array) {
    let act = this.active
    switch(act) {
      case 'active':
        array = array.filter(item => item.done !== true)
        break
      case 'done':
        array = array.filter(item => item.done === true)
        break
    }
    return array
  }

}

let start = new Todo('all')
start.createTodos()

document.querySelector(".add-button").onclick = event => {
  start.addTodo(event.target.previousElementSibling.value)
  event.target.previousElementSibling.value = ""
}

document.querySelector(".dropdown-toggle").onclick = sortButtonHandler

document.querySelector(".normal-sort").onclick = () => {
  sortTodo = 'normal'
  start.createTodos()
}

document.querySelector(".alphabetical-sort").onclick = () => {
  sortTodo = 'alphabetical'
  start.createTodos()
}

document.querySelector(".random-sort").onclick = () => {
  sortTodo = 'random'
  start.createTodos()
}

document.querySelector('.all-button').onclick = event => {
  activeButton(event.target)
  start.active = 'all'
  start.createTodos()
}

document.querySelector('.done-button').onclick = event => {
  activeButton(event.target)
  start.active = 'done'
  start.createTodos()
}

document.querySelector('.active-button').onclick = event => {
  activeButton(event.target)
  start.active = 'active'
  start.createTodos()
}