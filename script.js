document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is loaded");

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task!");
            return;
        }
    

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn')

        removeButton.onclick = function() {
            taskList.removeChild(li);
            if (save) {
                removeTaskFromStorage(taskText);
            }
        };

        li.appendChild(removeButton);

        taskList.appendChild(li);

        if (save) {
            saveTaskToStorage(taskText);
        }

    }

   function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
   }

   function saveTaskToStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
   }

   function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
   }

   addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = "";
    }
   });

   taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = "";
        }
    }
   });

    });

