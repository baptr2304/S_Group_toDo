var task = {
    id: "",
    category: "",
    title: "",
    content: "",
    time: "",
    status: ""
};
var tasks = [];

function displayTasks() {
    document.getElementById("todo").innerHTML = "";
    document.getElementById("doing").innerHTML = "";
    document.getElementById("done").innerHTML = "";
    countTask();

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var taskHtml = '<div class="card" id="' + task.id + '">' +
            '<div class="card-details-contain">' +
            '<span class="card-details__category">' + task.category + '</span>' +
            '<h3 class="card-details__title">' + task.title + '</h3>' +
            '<p class="card-details__content">' + task.content + '</p>' +
            '<p class="card-details__time">' +
            '<i class="fa-regular fa-clock"></i>&nbsp' + task.time + '</p>' +
            '</div>' +
            '<div class="card-details-options">' +
            '<i class="fa-solid fa-pen-to-square" onclick="showEditForm(' + task.id + ')" style="cursor: pointer;"></i>' +
            '<i class="fa-solid fa-trash" onclick="deleteTask(' + task.id + ')"></i>' +
            '</div>' +
            '</div>';
        if (task.status === "todo") {
            console.log(taskHtml);
            document.getElementById("todo").innerHTML += taskHtml;
        } else if (task.status === "doing") {
            document.getElementById("doing").innerHTML += taskHtml;
        }
        else if (task.status === "done") {
            document.getElementById("done").innerHTML += taskHtml;
        }
    }
}
//format the time 
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var time = new Date()

// create a function to add a task
function addTask(category, title, content, time, status) {
    var task = {
        id: tasks.length + 1,
        category: category,
        title: title,
        content: content,
        time: time,
        status: status
    };
    tasks.push(task);
    displayTasks();
}

// create a function to submit the task
function submit_add() {
    const input_add_task = document.querySelectorAll(".input_add_task");
    for (let i = 0; i < input_add_task.length; i++) {
        if (input_add_task[i].value === "") {
            input_add_task[i].style.border = "1px solid red";
        }
        else if (input_add_task[i].value !== "") {
            input_add_task[i].style.border = "1px solid green";
        }
    }
    var category = document.getElementById("category").value;
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    var time = new Date().toLocaleDateString("en-US", options);
    var status = "todo";
    if (category !== "" && title !== "" && content !== "") {
        addTask(category, title, content, time, status);
        document.getElementById("add-form").style.display = "none";
        document.getElementById("add-task__overlay").style.display = "none";
    }
}

// create a function find task by id
function findTaskById(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            return tasks[i];
        }
    }
}
// create a function to edit a task
function editTask(category, title, content, time, status, id) {
    console.log(category, title, content, time, status, id);
    var task = findTaskById(id);
    task.category = category;
    task.title = title;
    task.content = content;
    task.time = time;
    task.status = status;
    displayTasks();
}

function submit_edit() {
    const input_edit_task = document.querySelectorAll(".input_add_task");
    for (let i = 0; i < input_edit_task.length; i++) {
        if (input_edit_task[i].value === "") {
            input_edit_task[i].style.border = "1px solid red";
        }
        else if (input_edit_task[i].value !== "") {
            input_edit_task[i].style.border = "1px solid green";
        }
    }
    var category = document.getElementById("category-edit").value;
    var title = document.getElementById("title-edit").value;
    var content = document.getElementById("content-edit").value;
    var time = new Date().toLocaleDateString("en-US", options);
    // check radio button
    var status = document.querySelector('input[name="status"]:checked').value;
    var id = document.getElementById("id-edit").innerHTML;
    if (category !== "" && title !== "" && content !== "") {
        editTask(category, title, content, time, status, id);
        document.getElementById("edit-form").style.display = "none";
        document.getElementById("edit-task__overlay").style.display = "none";
    }
    console.log(category, title, content, time, status, id);



}

function showAddForm() {
    document.getElementById("add-form").style.display = "block";
    document.getElementById("add-task__overlay").style.display = "block";
    // clear the form
    document.getElementById("category").value = "";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    // set border to default
    const input_add_task = document.querySelectorAll(".input_add_task");
    for (let i = 0; i < input_add_task.length; i++) {
        input_add_task[i].style.border = "1px solid #ccc";
    }

}

function closeAddForm() {
    document.getElementById("add-form").style.display = "none";
    document.getElementById("add-task__overlay").style.display = "none";

}
//show edit-task form and value the task by id
function showEditForm(id) {
    console.log(id);
    document.getElementById("edit-form").style.display = "block";
    document.getElementById("edit-task__overlay").style.display = "block";
    document.getElementById("id-edit").innerHTML = id;
    var task = findTaskById(id);
    console.log(task);
    document.getElementById("category-edit").value = task.category;
    document.getElementById("title-edit").value = task.title;
    document.getElementById("content-edit").value = task.content;
    if (task.status === "todo") {
        document.getElementById("todo-edit").checked = true;
    }
    else if (task.status === "doing") {
        document.getElementById("doing-edit").checked = true;
    }
    else if (task.status === "done") {
        document.getElementById("done-edit").checked = true;
    }

    const input_edit_task = document.querySelectorAll(".input_add_task");
    for (let i = 0; i < input_edit_task.length; i++) {
        input_edit_task[i].style.border = "1px solid #ccc";
    }
}

function closeEditForm() {
    document.getElementById("edit-form").style.display = "none";
    document.getElementById("edit-task__overlay").style.display = "none";
}

// delete task by id
function deleteTask(id) {
    console.log(id);
    var task = findTaskById(id);
    var index = tasks.indexOf(task);
    tasks.splice(index, 1);
    displayTasks();
}

function countTask() {
    // todo
    var todo = 0;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].status === "todo") {
            todo++;
        }
    }

    // doing
    var doing = 0;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].status === "doing") {
            doing++;
        }
    }

    // done
    var done = 0;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].status === "done") {
            done++;
        }
    }
    document.getElementById("title-num--todo").innerHTML = todo;
    document.getElementById("title-num--doing").innerHTML = doing;
    document.getElementById("title-num--done").innerHTML = done;
}

displayTasks();