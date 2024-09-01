document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.querySelector('#addTask');
    const newTaskInput = document.querySelector('#newTask');
    const taskList = document.querySelector('.taskList');

    function addToDOM(todos) {
        taskList.innerHTML = "";
        todos.forEach(element => {
            let li = document.createElement('li');
            li.innerHTML = `
                <span class="taskName">${element.name}</span>
                <button data-id="${element.id}" class="up-btn">⬆️</button>
                <button data-id="${element.id}" class="down-btn">⬇️</button>
                <button data-id="${element.id}" class="delete-btn">❌</button>
            `;
            taskList.appendChild(li);
        });
    }

    function fetchTodos() {
        axios.get('/getTodos')
            .then((res) => {
                addToDOM(res.data);
            })
            .catch((err) => {
                console.error("Error fetching todos:", err);
            });
    }

    fetchTodos();

    addTaskButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        axios.post('/addTodo', { name: newTaskInput.value })
            .then((res) => {
                addToDOM(res.data);
                newTaskInput.value = "";
            })
            .catch((err) => {
                console.error("Error adding todo:", err);
            });
    });

    taskList.addEventListener('click', (ev) => {
        const id = ev.target.getAttribute('data-id');
        
        if (ev.target.classList.contains('delete-btn')) {
            axios.post('/deleteTodo', { id })
                .then((res) => {
                    addToDOM(res.data);
                })
                .catch((err) => {
                    console.error("Error deleting todo:", err);
                });
        } else if (ev.target.classList.contains('up-btn')) {
            axios.post('/updatePriority', { id, direction: 'up' })
                .then((res) => {
                    addToDOM(res.data);
                })
                .catch((err) => {
                    console.error("Error updating priority:", err);
                });
        } else if (ev.target.classList.contains('down-btn')) {
            axios.post('/updatePriority', { id, direction: 'down' })
                .then((res) => {
                    addToDOM(res.data);
                })
                .catch((err) => {
                    console.error("Error updating priority:", err);
                });
        }
    });
});
