
const addTaskButton = document.querySelector(".addTaskButton");
const taskinput = document.querySelector(".taskinput");
const body = document.querySelector("body");
const taskListBody = document.querySelector(".tasklist");
const showallbuttonElement = document.querySelector(".showallbutton");
const showDoneElement = document.querySelector(".showDone");
const showundoneElement = document.querySelector(".showundone");
const filterstartElement = document.querySelector(".filterstart");
const filterDoneElement = document.querySelector(".filterShowDone");
const filterUnDoneElemenet = document.querySelector(".filterShowUnDone");



let taskList = [

]


showallbuttonElement.addEventListener("click", (event) => {
    filterstartElement.checked = true;
    renderTask();
})


showDoneElement.addEventListener("click", (event) => {
    filterDoneElement.checked = true;
    renderTask();
})


showundoneElement.addEventListener("click", (event) => {
    filterUnDoneElemenet.checked = true;
    renderTask();
})



addTaskButton.addEventListener("click", (event) => {

    filterstartElement.checked = true;
    const taskinput = document.querySelector(".taskinput");
    if (taskinput.value === "") {
        alert("Введите текст задачи!")
    } else {
        taskList.push({
            id: `${taskList.length + 1}`,
            taskDescription: `${taskinput.value}`,
            checked: false
        })
        taskinput.value = ""
        renderTask();
    }
})




function deleteTaskListners() {
    const deleteButtonElements = document.querySelectorAll(".deleteTaskButton");
    for (const deleteButtonElement of deleteButtonElements) {
        deleteButtonElement.addEventListener("click", (event) => {
            const index = [...deleteButtonElements].indexOf(deleteButtonElement);
            taskList.splice(index, 1);
            renderTask();
        })
    }
}

function taskParagraphListners() {
    const taskParagraphElements = document.querySelectorAll(".TaskParagraph");
    for (const taskParagraphElement of taskParagraphElements) {
        taskParagraphElement.addEventListener("dblclick", (event) => {
            taskParagraphElement.classList.remove("TaskParagraphOutline");
            taskParagraphElement.classList.add("TaskParagraphBorder");
            const index = [...taskParagraphElements].indexOf(taskParagraphElement);
            taskParagraphElement.readOnly = false;
        })
    }
}


function taskParagraphListners2() {
    const taskParagraphElements = document.querySelectorAll(".TaskParagraph");
    for (const taskParagraphElement of taskParagraphElements) {
        taskParagraphElement.addEventListener("keypress", (event) => {
            if (event.key === 'Enter') {
                taskParagraphElement.classList.remove("TaskParagraphBorder");
                taskParagraphElement.classList.add("TaskParagraphOutline");
                const index = [...taskParagraphElements].indexOf(taskParagraphElement);
                taskList[index].taskDescription = taskParagraphElement.value;
                taskParagraphElement.readOnly = true;
                renderTask();
            }
        })
    }
}

function taskCheckboxListners() {
    const taskcheckboxElements = document.querySelectorAll(".custom-checkbox");
    for (const taskcheckboxElement of taskcheckboxElements) {
        taskcheckboxElement.addEventListener("click", () => {
            const index = [...taskcheckboxElements].indexOf(taskcheckboxElement);
            if (Array.from(taskcheckboxElement.classList).includes("custom-checkbox_checked")) {
                taskcheckboxElement.classList.remove("custom-checkbox_checked");
                let checkedstatus = taskList[index].checked;
                taskList[index].checked = !checkedstatus;
            } else {
                taskcheckboxElement.classList.add("custom-checkbox_checked");
                let checkedstatus = taskList[index].checked;
                taskList[index].checked = !checkedstatus;
            }
            renderTask();
        })

    }
}



function renderTask() {
    if (filterstartElement.checked) {
        const tasksHtml = taskList.map((task, index) => {
            return `
                <div class="task">
                    <label>
                        <span class="custom-checkbox taskcheckbox ${task.checked ? "custom-checkbox_checked" : ""}"></span>
                    </label>
                     <label>
                        <input value="${task.taskDescription}"  class="TaskParagraph TaskParagraphOutline ${task.checked ? "taskDone" : ""}"  readonly="readonly"/>
                     </label>
                    <button class="deleteTaskButton">Удалить</button>
                </div>
            `
        }).join("")

        taskListBody.innerHTML = tasksHtml;
        deleteTaskListners();
        taskParagraphListners();
        taskParagraphListners2();
        taskCheckboxListners();

    }else if (filterDoneElement.checked) {
        const doneTaskList = taskList.filter((task) => task.checked === true);
        console.log(taskList)
        const tasksHtml = doneTaskList.map((task, index) => {
            return `
                <div class="task">
                    <label>
                        <span class="custom-checkbox taskcheckbox ${task.checked ? "custom-checkbox_checked" : ""}"></span>
                    </label>
                     <label>
                        <input value="${task.taskDescription}"  class="TaskParagraph TaskParagraphOutline ${task.checked ? "taskDone" : ""}"  readonly="readonly"/>
                     </label>
                    <button class="deleteTaskButton">Удалить</button>
                </div>
            `
        }).join("")

        taskListBody.innerHTML = tasksHtml;
        deleteTaskListners();
        taskParagraphListners();
        taskParagraphListners2();
        taskCheckboxListners();
    }else if (filterUnDoneElemenet.checked) {
        const doneTaskList = taskList.filter((task) => task.checked === false);
        console.log(taskList)
        const tasksHtml = doneTaskList.map((task, index) => {
            return `
            <div class="task">
                <label>
                    <span class="custom-checkbox taskcheckbox ${task.checked ? "custom-checkbox_checked" : ""}"></span>
                </label>
                 <label>
                    <input value="${task.taskDescription}"  class="TaskParagraph TaskParagraphOutline ${task.checked ? "taskDone" : ""}"  readonly="readonly"/>
                 </label>
                <button class="deleteTaskButton">Удалить</button>
            </div>
        `
        }).join("")

        taskListBody.innerHTML = tasksHtml;
        deleteTaskListners();
        taskParagraphListners();
        taskParagraphListners2();
        taskCheckboxListners();
    }


}






renderTask();
