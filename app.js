// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all eventListeners

loadEventListeners();

function loadEventListeners(){
  // add tasks
  form.addEventListener('submit',addTask);
  // remove task
  taskList.addEventListener('click', removeTask);
  // clear All tasks
  clearBtn.addEventListener('click',clearTasks);
  // filter tasks
  filter.addEventListener('keyup',filterTasks);
}

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
 // clear input
  taskInput.value = '';

  e.preventDefault();
}

function removeTask(e){

if(e.target.parentElement.classList.contains('delete-item'))
{
   if(confirm('Are you sure !'))
   {
    e.target.parentElement.parentElement.remove();
   }
}
  e.preventDefault();
}

function clearTasks(e){
 // taskList.innerHTML = "";

 // faster way
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
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







