const input = document.querySelector("#myInput");
const addBtn = document.querySelector("#myButton");
const todoList = document.querySelector("#todoList");
const doneList = document.querySelector("#doneList");
const pTaskCount = document.querySelector("#pTaskCount");
const pTaskCountText = " tasks completed";
const pInfo = document.querySelector("#pInfo");

const todoArray = [];

function existingTask (text) {
    if ((todoArray.findIndex(i => i.task === text)) >= 0) {
        return true;
    } else {
        return false;
    }
};

function taskCounter () {
    let tasks = 0;
    for (let i = 0; i < todoArray.length; i++) {
        if (todoArray[i].completed === "yes"){
            tasks++;
        }
    }
    return tasks;
};

function addToArray (text) {
    let obj = {};
    let objText = text;
    obj['task'] = objText;
    obj['completed'] = "no";
    todoArray.push(obj);
};

function completedArray (text) {
    const index = todoArray.findIndex(i => i.task === text);
    if (todoArray[index].completed === "yes") {
        todoArray[index].completed = "no";
    } else {
        todoArray[index].completed = "yes";
    };
};

addBtn.addEventListener("click", () => {
    let text = input.value;
    if (text === "" || text == null) {
        pInfo.innerText = "You cannot add nothing, nothing is not a task that you can complete. That is only possible in Nirvana and you are not there... yet. Try to complete some more tasks to further your journey to Nirvana."
    } else {
        if (existingTask(text) == true) {
            pInfo.innerText = "That task is already in the list!";
        } else {
            pInfo.innerText = "";
        
            addToArray(text);
        
            const item = document.createElement("li");
            todoList.appendChild(item);

            const itemLabel = document.createElement("span");
            itemLabel.innerText = text;
        
            item.appendChild(itemLabel);

            itemLabel.addEventListener("click", () => {
                if(item.getAttribute("class") == "completed") {
                    pInfo.innerText = "";
                    item.setAttribute("class", "");
                    todoList.appendChild(item);
                    completedArray(item.innerText);
                    pTaskCount.innerText = taskCounter() + pTaskCountText;
                } else {
                    pInfo.innerText = "";
                    item.setAttribute("class", "completed");
                    doneList.appendChild(item);
                    completedArray(item.innerText);
                    pTaskCount.innerText = taskCounter() + pTaskCountText;
                }
            });
        };
    };
});

