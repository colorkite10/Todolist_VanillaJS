document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const renderTodos = () => {
    todoList.innerHTML = ""; //이건 왜 해주는 거지?
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = todo;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete"); //classList가 뭐지?
      deleteButton.addEventListener("click", () => {
        todos.splice(index, 1); //splice 로직 알아두기
        updateLocalStorage();
        renderTodos();
      });

      li.appendChild(deleteButton); //appendChild가 뭐지?
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
      todos.push(newTodo);
      updateLocalStorage();
      renderTodos();
      todoInput.value = "";
    }
  });
  renderTodos();
});
