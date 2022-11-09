class ToDoDto {
  titel;
  erledigt;

  constructor(titel, erledigt) {
    this.titel = titel;
    this.erledigt = erledigt;
  }
}

class ToDo extends EventTarget {
  #titel = '';
  #erledigt = '';

  constructor(titel, erledigt) {
    super();
    this.#titel = titel;
    this.#erledigt = erledigt;
  }

  get titel() {
    return this.#titel;
  }

  set titel(titel) {
    this.#titel = titel;
  }

  get erledigt() {
    return this.#erledigt;
  }

  set erledigt(erledigt) {
    this.#erledigt = erledigt;
  }

  element(index) {
    const listElement = document.createElement('li');
    const divElement = document.createElement('div');
    const checkboxElement = document.createElement('input');
    const spanElement = document.createElement('span');
    const buttonElement = document.createElement('button');

    listElement.appendChild(divElement);

    divElement.appendChild(checkboxElement);
    divElement.appendChild(spanElement);
    divElement.appendChild(buttonElement);

    checkboxElement.setAttribute('type', 'checkbox');
    checkboxElement.setAttribute('id', `${index}`);

    buttonElement.className = 'loeschen';

    spanElement.innerText = this.#titel;
    buttonElement.innerText = 'Löschen';

    if (this.#erledigt) {
      checkboxElement.setAttribute('checked', 'checked');
      divElement.className = 'erledigt';
    }


    buttonElement.addEventListener('click', () => {
      this.dispatchEvent(new Event('loeschen'));
    });

    return listElement;
  }
}


let todos = [];

document.addEventListener('DOMContentLoaded', (event) => {
  todos = loadTodosFromLocalStorage();
  updateToDoListOnScreen();

  createEventListenerForDeletionOfErledigteTodos();
  createEventListenerForTodoCreation();
});

//loadTodos
function loadTodosFromLocalStorage() {
  let retrievedData = localStorage.getItem('todos');
  if (retrievedData != null) {
    let data = JSON.parse(retrievedData);
    console.log(data);
    return createTodos(data);
  }
  return [];
}

function createTodos(data) {
  let loadedTodos = [];

  data.forEach(element => {
    loadedTodos.push(new ToDo(element.titel, element.erledigt));

  })

  loadedTodos.forEach(todo => {
    createDeleteEventListenerForTodo(todo);
  })
  return loadedTodos;
}

// createListenerForErledigteLöschung
function createEventListenerForDeletionOfErledigteTodos() {
  const button = document.getElementById('aufraeumen');
  button.addEventListener('click', (e) => {
    removeErledigteTodoFromTodos();
  })
}

function removeErledigteTodoFromTodos() {
  let elementsToBeRemoved = selectElementsToBeRemoved(todos);
  todos = removeElementsFromArray(todos, elementsToBeRemoved)

  updateToDoListOnScreen();
}

function selectElementsToBeRemoved(todos) {
  let elementsToBeRemoved = [];
  todos.forEach(e => {
    if (e.erledigt == true) {
      elementsToBeRemoved.push(e);
    }
  })
  return elementsToBeRemoved;
}

function removeElementsFromArray(array, elementsToBeRemoved) {
  array = todos.filter(function (el) {
    return elementsToBeRemoved.indexOf(el) < 0;
  });
  return array;
}

// createListenerForCreation
function createEventListenerForTodoCreation() {
  const neuesToDoElement = document.getElementById('neuesToDo');
  neuesToDoElement.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      const todo = new ToDo(neuesToDoElement.value, false);
      todos.push(todo);

      neuesToDoElement.value = '';

      createDeleteEventListenerForTodo(todo);

      updateToDoListOnScreen();
    }
  });
}

//updateToDoListOnScreen
function updateToDoListOnScreen() {
  sortTodosAlphabetically();
  renderTodosToScreen();
  saveTodosToLocalStorage();
  countOpenTodos();
  createEventlistenerErledigtForTodo();
}

function sortTodosAlphabetically() {
  todos.sort(function (a, b) {
    return a.titel.toLowerCase().localeCompare(b.titel.toLowerCase());
  });
}

function renderTodosToScreen() {
  const todoListElement = document.getElementById('todolist');

  todoListElement.innerHTML = '';

  todos.forEach((todo, i) => {
    let toDoListEntry = todo.element(i);
    todoListElement.appendChild(toDoListEntry);

  })
}

function saveTodosToLocalStorage() {
  let todosDto = [];

  todos.forEach((todo, i) => {
    todosDto.push(new ToDoDto(todo.titel, todo.erledigt));
  })

  localStorage.setItem("todos", JSON.stringify(todosDto));
}

function countOpenTodos() {
  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  const elementAnzahl = document.getElementById('anzahl');
  elementAnzahl.textContent = `${offeneToDos.length} ToDo's offen`;
}

function createEventlistenerErledigtForTodo() {
  const checkboxElements = document.querySelectorAll('[type="checkbox"]');
  checkboxElements.forEach((e) => {

    e.addEventListener('click', (event) => {
      id = e.getAttribute('id');

      adjustErledigtState(todos[id])
      updateToDoListOnScreen();
    })

  })
}

function adjustErledigtState(todo) {
  todo.erledigt = todo.erledigt ? false : true;
}

function createDeleteEventListenerForTodo(todo) {
  todo.addEventListener('loeschen', (e) => {
    const index = todos.indexOf(e.target);
    todos.splice(index, 1);
    updateToDoListOnScreen();
  });
}
