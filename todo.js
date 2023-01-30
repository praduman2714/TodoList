let tasks = [];

const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const taskCounter = document.getElementById("tasks-counter");


function addToDom(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="dele.png" class="delete" data-id="${task.id}" />
    `;

    tasksList.append(li);
}


function renderList(){
    tasksList.innerHTML = "";
    for(let i = 0; i<tasks.length ; i++){
        addToDom(tasks[i]);

    }
    taskCounter.innerHTML = tasks.length;
}

function addTasks(task){
    if(task){
        tasks.push(task);
        showNotification("Plan Added")
        renderList();
        return;
    }
    showNotification("Task cannot be added");
}

function toggleTasks(taskId){
    for(let i = 0; i<tasks.length; i++){
        if(tasks[i].id === taskId){
            tasks[i].completed = !tasks[i].completed;
            showNotification("Tasks Toggled");
        }
    }
}

function deleteTasks(taskID){
    const newTask = tasks.filter(function(task){
        return task.id !== taskID;
    })
    tasks = newTask;
    renderList();
    showNotification("Task deleted");
}

function showNotification(task){
    alert(task);
    return ;
}

function handleInput(e){
    if(e.key === 'Enter'){
        const text = e.target.value;

        if(!text){
            showNotification("Tell me what is your plan !");
            return;
        }

        const task = {
            text,
            id : Date.now().toString(),
            completed : false,
        };
        e.target.value= "";
        addTasks(task);
    }
}

function handleClickListner(event){
    const target = event.target;
    // console.log(target);

    if(target.className === 'delete'){
        const id = target.dataset.id;
        deleteTasks(id);
        return ;
    }else if(target.className === 'custom-checkbox'){
        const id = target.id;
        toggleTasks(id);
        return;
    }
}

addTaskInput.addEventListener('keyup', handleInput);
document.addEventListener('click', handleClickListner);
