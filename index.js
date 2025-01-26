const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
  todos.forEach(todo => {
    add(todo);
  })
}

form.addEventListener("submit",function (e) {
  e.preventDefault();//submit時のイベントを中断できる
  add();
});


function add(todo) {
  let todotext = input.value;

  if (todo) {
    todotext = todo.text;
  }
  if (todotext){
    const li = document.createElement("li");
    li.innerText = todotext;
    li.classList.add("list-group-item");
    //&& = 両方がtrueの時に実行
    if (todo && todo.completed){
      li.classList.add("text-decoration-line-through");
    }

    li.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("click", function () {
      //toggle=同じ処理や命令の実行により二つの状態が交互に反転する処理
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData(){
  const lists = document.querySelectorAll("li");
  let todos = [];

  lists.forEach(list => {
    let todo = {
      Text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through")
    };
    todos.push(todo)
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  
}