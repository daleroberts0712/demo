class Task{
    constructor(name, entry, complete){
        this.name = name;
        this.entry = entry;
        this.complete = complete;
    }
}
//ADD BOOK//
class UI{
    static displayTasks(){
        const tasks = Store.getTasks();

        tasks.forEach((task) => UI.addTaskToList(task))
    }

    static addTaskToList(task){
        const list = document.querySelector('.tasklist');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="list-group-item text-capitalize">
                <ol class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                        <div class="fw-bold">${task.name}</div>
                        Content for list item
                        </div>
                        <span class="badge text-bg-primary rounded-pill">14</span>
                    </li>
                </ol>
            </td>
        `;
        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('.name').value = '';
        document.querySelector('.entry').value = '';
        document.querySelector('.complete').value = '';
    }
}

document.addEventListener('DOMContentLoaded', UI.displayTasks);

document.querySelector('.my-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.name').value;
    const entry = document.querySelector('.entry').value;
    const complete = document.querySelector('.complete').value;

    if(name === '' || entry === '' || complete === ''){
        alert('Fill In All Fields');

    }else{
        const task = new Task(name, entry, complete);

        UI.addTaskToList(task);
        UI.clearFields()
        Store.addTask(task)
    }   
});

//LOCALSTORAGE//
class Store{
    static getTasks(){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        return tasks;
    }

    static addTask(task){
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }   

    static removeTask(complete){
        const tasks = Store.getTasks();
        tasks.forEach((task, index) => {
            if(task.complete === complete){
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

//REMOVE BOOK//
document.querySelector('#add').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete'))
    confirm('Delete Completed Task!')
    e.target.parentElement.parentElement.remove();
    
    Store.removeTask(e.target.parentElement.previousElementSibling.textContent);
});
