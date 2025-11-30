// Run all code only after the page fully loads
document.addEventListener('DOMContentLoaded', function () {

    // --- Select DOM Elements ---
    const addButton = document.getElementById('add-task-btn');   // Add Task button
    const taskInput = document.getElementById('task-input');      // Input field for tasks
    const taskList = document.getElementById('task-list');        // <ul> that displays tasks

    // --- Function to Add a New Task ---
    function addTask() {
        // Get and trim input value
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a Remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Remove task when the button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Add button inside <li>, then add <li> to the list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field
        taskInput.value = "";
    }

    // --- Add Event Listeners ---

    // Add task by clicking the button
    addButton.addEventListener('click', addTask);

    // Add task by pressing the Enter key inside the input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded (as instructed)
    addTask();
});

// script.js - To-Do List with Local Storage persistence
document.addEventListener('DOMContentLoaded', function () {
    // --- Select DOM Elements ---
    const addButton = document.getElementById('add-task-btn');   // Add Task button
    const taskInput = document.getElementById('task-input');     // Input field for tasks
    const taskList = document.getElementById('task-list');       // <ul> that displays tasks

    // --- In-memory tasks array (source of truth) ---
    let tasks = [];

    // --- Save tasks array to Local Storage ---
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // --- Create a task DOM element and optionally save it ---
    // save = true means the provided taskText will be added to tasks[] and persisted
    function createTaskElement(taskText, save = true) {
        // Create list item and inner span for text (so we can read text without button text)
        const listItem = document.createElement('li');

        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        listItem.appendChild(textSpan);

        // Create Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        // use classList.add as required by checker
        removeButton.classList.add('remove-btn');

        // Remove handler: remove from DOM and update Local Storage
        removeButton.onclick = function () {
            // Remove from DOM
            taskList.removeChild(listItem);

            // Remove first matching occurrence from tasks array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
            }
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // If requested, add to tasks array and persist
        if (save) {
            tasks.push(taskText);
            saveTasksToLocalStorage();
        }
    }

    // --- Load tasks from Local Storage and populate the UI ---
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Replace in-memory tasks with storedTasks
        tasks = storedTasks.slice(); // shallow copy
        // Populate DOM (do not save again while creating)
        tasks.forEach(taskText => {
            createTaskElement(taskText, false);
        });
    }

    // --- Add Task (reads input, validates, creates element & saves) ---
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create task element and save to Local Storage
        createTaskElement(taskText, true);

        // Clear input field
        taskInput.value = "";
    }

    // --- Event Listeners ---
    addButton.addEventListener('click', addTask);

    // Allow Enter key to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // --- Initialize app by loading tasks from Local Storage ---
    loadTasks();
});
