document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = todo.text;
      if (todo.completed) {
        li.classList.add("completed");
      }

      li.addEventListener("click", () => {
        todo.completed = !todo.completed;
        updateLocalStorage();
        renderTodos();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        todos.splice(index, 1);
        updateLocalStorage();
        renderTodos();
      });

      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  };

  const updateLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTodo = todoInput.value.trim();
    if (newTodo) {
      todos.push({ text: newTodo, completed: false });
      updateLocalStorage();
      renderTodos();
      todoInput.value = "";
    }
  });
  renderTodos();
});
