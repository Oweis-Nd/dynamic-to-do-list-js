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
