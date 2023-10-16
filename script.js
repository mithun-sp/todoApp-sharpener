const myForm = document.querySelector("#my-form");
const todo = document.getElementById("todo");
const description = document.getElementById("description");
const pendingTodo = document.getElementById("todoListPending");
const doneTodo = document.getElementById("todoListDone");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let myObj = {
    todo: todo.value,
    description: description.value,
    isDone: false,
  };

  axios
    .post(
      "https://crudcrud.com/api/9af2b78b0ada425f9d908b4195a86cdf/todos",
      myObj
    )
    .then((res) => {
      console.log(res.data);
      location.reload();
    })
    .catch((err) => console.log(err));

    todo.value = ""
    description.value = ""
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/9af2b78b0ada425f9d908b4195a86cdf/todos")
    .then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        showTodo(res.data[i])
      }
    })
    .catch((err) => console.log(err));
});

function showTodo(data) {
  console.log(data);
  const todo = data.todo;
  const description = data.description;

  const li = document.createElement("li");
  li.innerHTML = `<strong>${todo}</strong>:${description}`;

  const span = document.createElement("span");

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add = "delete";
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => onDelete(data._id))

  if(data.isDone===false){

    // Edit Button
    const tickBtn = document.createElement("button")
    tickBtn.classList.add = "tick"
    tickBtn.textContent = "✅"
    tickBtn.addEventListener("click", () => onEdit(data))
  
    span.appendChild(tickBtn)
    span.appendChild(deleteBtn)
  
    li.appendChild(span);
    pendingTodo.appendChild(li);
  }else{
    span.appendChild(deleteBtn);
    li.appendChild(span)
    doneTodo.appendChild(li);
  }  
}

function onEdit(data){
    const newObj = {
        todo:data.todo,
        description:data.description,
        isDone:true
    }
    axios.put(`https://crudcrud.com/api/9af2b78b0ada425f9d908b4195a86cdf/todos/${data._id}`, newObj)
    .then((res) => {
        console.log(res.data)
        location.reload()
    })
    .catch((err) => console.log(err))
}

function onDelete(id){
    axios.delete(`https://crudcrud.com/api/9af2b78b0ada425f9d908b4195a86cdf/todos/${id}`)
    .then((res) => {
        console.log(res)
        location.reload()
    })
    .catch((err) => console.log(err))
}
