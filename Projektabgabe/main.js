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

function updateToDoListOnScreen() {
  const todoListElement = document.getElementById('todolist');

  // Liste leeren
  todoListElement.innerHTML = '';

  // ToDo's einfügen
  todos.forEach((todo, i) => {
    let toDoListEntry = todo.element(i);
    todoListElement.appendChild(toDoListEntry);
  })

  localStorage.setItem("todos", JSON.stringify(todos));


  // offene ToDo's
  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  const elementAnzahl = document.getElementById('anzahl');
  elementAnzahl.textContent = `${offeneToDos.length} ToDo's offen`;

  // Klick auf Checkbox auf Objekt anwenden
  const checkboxElements = document.querySelectorAll('[type="checkbox"]');
  checkboxElements.forEach((e) => {

    e.addEventListener('click', (event) => {
      id = e.getAttribute('id');

      adjustErledigtState(todos[id])
      updateToDoListOnScreen();
    })

  })
}

// erledigtStatus wechseln
function adjustErledigtState(todo){
  todo.erledigt = todo.erledigt? false : true;
}


document.addEventListener('DOMContentLoaded', (event) => {
  updateToDoListOnScreen();

  // aufraeumen löscht alle Objekte mit erledigt = true
  const button = document.getElementById('aufraeumen');
  button.addEventListener('click', (e) => {    
    removeErledigteTodoFromTodos();
  })

  const neuesToDoElement = document.getElementById('neuesToDo');
  neuesToDoElement.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      const todo = new ToDo(neuesToDoElement.value, false);
      todos.push(todo);

      neuesToDoElement.value = '';

      todo.addEventListener('loeschen', (e) => {
        const index = todos.indexOf(e.target);
        todos.splice(index, 1);
        updateToDoListOnScreen();
      });

      updateToDoListOnScreen();
    }
  });
});

function removeErledigteTodoFromTodos(){
  let elementsToBeRemoved = selectElementsToBeRemoved(todos);
  todos = removeElementsFromArray(todos, elementsToBeRemoved)
  
  updateToDoListOnScreen();
}

// helperFunktionen für elemententauswahl und entfernung
function selectElementsToBeRemoved(todos){
  let elementsToBeRemoved = [];
  todos.forEach(e => {
    if (e.erledigt == true) {
      elementsToBeRemoved.push(e);
    }
  })
  return elementsToBeRemoved;
}

function removeElementsFromArray(array, elementsToBeRemoved){
  array = todos.filter(function (el) {
    return elementsToBeRemoved.indexOf(el) < 0;
  });
  return array;
}