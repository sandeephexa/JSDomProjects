// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all eventListeners

loadEventListeners();

function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);
  // add tasks
  form.addEventListener('submit',addTask);
  // remove task
  taskList.addEventListener('click', removeTask);
  // clear All tasks
  clearBtn.addEventListener('click',clearTasks);
  // filter tasks
  filter.addEventListener('keyup',filterTasks);
}

// load Local storage tasks
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
        // create li element
  const li = document.createElement('li');
  // add class to li
     li.className = 'collection-item';
  // create text node and append to li
     li.appendChild(document.createTextNode(task));
  // create link for 'x' symbo
   const link = document.createElement('a');
   // add class to link
   link.className='delete-item secondary-content';
  // add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    taskList.appendChild(li);
  })
  
}
// Add task
function addTask(e){

  if(taskInput.value === '')
  {
    alert("no task added ");
  }
 // create li element
    const li = document.createElement('li');
 // add class to li
    li.className = 'collection-item';
 // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
 // create link for 'x' symbo
  const link = document.createElement('a');
  // add class to link
  link.className='delete-item secondary-content';
 // add icon
   link.innerHTML = '<i class="fa fa-remove"></i>';
   // append link to li
   li.appendChild(link);
   
   console.log(li);
// append li to ul
 taskList.appendChild(li);
 // store in local storage
 storeTaskInLocalStorage(taskInput.value);
 // clear input
  taskInput.value = '';

  e.preventDefault();
}

// add task to local storage
function storeTaskInLocalStorage(task)
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){

if(e.target.parentElement.classList.contains('delete-item'))
{
   if(confirm('Are you sure !'))
   {
    e.target.parentElement.parentElement.remove();
    // remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
   }
}
  e.preventDefault();
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem){
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){

    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clearTasks(e){
 // taskList.innerHTML = "";

 // faster way
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
    // clear tasks from local storage
    clearTasksFromLocalStorage();
  }
}

// clear from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
function filterTasks(e){

  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
   console.log("hitting task "+task);
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1)
    {
      task.style.display = 'block';
    }
    else
    {
      task.style.display = 'none';
    }

  })
}







