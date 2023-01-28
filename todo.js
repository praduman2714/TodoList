const tasks = [];

const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// console.log('Working');

function addToDom(task){
    const li = document.createElement('li');
    li.innerHTML = `
        
            <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''}  class="custom-checkbox">
            <label for="${task.id}"> ${task.text} </label>
            <img src="dele.png" class="delete" data-id="${task.id}" />
        
    `;

    taskList.append(li);
}


function renderList () {
    taskList.innerHTML = "";
    for(var i = 0; i<tasks.length; i++){
        addToDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete (taskId) {
    const tasks = tasks.filter(function(task){
        return task.id !== taskId 
    });
    if(tasks.length > 0){
        const currentTask = task[0];
        currentTask.done = true;
        showNotification("Task Accomplised");
        renderList();
        return;
    }
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId 
    });
    tasks = newTasks;
    renderList();
    showNotification("Tasks Deleted :)")

}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification("Task added sucessfully!");
        return;
    }
    showNotification("Task can not be added :(");
}

function showNotification(text) {
    alert(text);
}

function handleInput(event){
    if(event.key === 'Enter'){
        const text = event.target.value;

        if(text === ""){
            showNotification("The Input box is Empty!");
            return;
        }
        // addTask(text);
        const task = {
            text,
            date : Date.now().toString(),
            done : false,
        }
    
        addTask(task);
        event.target.value = "";
    }
}

addTaskInput.addEventListener("keyup" , handleInput);