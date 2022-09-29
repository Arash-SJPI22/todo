const input = document.querySelector("#myInput");
const addBtn = document.querySelector("#myButton");
const todoList = document.querySelector("#todoList");
const doneList = document.querySelector("#doneList");
const pTaskCount = document.querySelector("#pTaskCount");
const pTaskCountText = " tasks completed";
const pInfo = document.querySelector("#pInfo");

// For the idiots
let idiotCounter = 0;
const idiotArray = ["No, that is not permited.", "Sir, SIR! SIIIR! DONT DO THAT!", "NO NO BAD MONKEY!", "Have you tried some thing else?", "Shouldn't you buy a new mouse by now?", "Hey this isn't a slot machine, stop pressing the button!", "WHAT... ARE... YOU... DOING?!", "Monkey want a banana?", "Have you seen a computer beore? Are you sure?", "For godsake man, get a hold of your self!", "no ... no ... no ... still no ...", "Pss pss kitty get of the computertable, bad kitty!", "PRESS THAT BUTTON ONE MORE TIME, ONE MORE TIME. I DARE YOU, SEE WHAT HAPPENS!"];

function checkIdiot() {
    idiotCounter++;
    if (idiotCounter > 3 && idiotCounter < 29) {
        let rand = Math.round(Math.random() * 11);
        pInfo.innerText = idiotArray[rand];
    } else if (idiotCounter == 29) {
        pInfo.innerText = idiotArray[12];
    } else if (idiotCounter == 30) {
        addBtn.hidden = "hidden";
        pInfo.innerText = "Look at what you made me do. Now go outside insted and play with sticks...";
    }
};

const todoArray = [];

// To check if the inputed text already exists in the array as a task 
// checks the array to see if the text matches any task: content. If it dose it will have an array index above 0 and there fore return true. If if return -1 it will return false
function existingTask (text) {
    if ((todoArray.findIndex(i => i.task === text)) >= 0) {
        return true;
    } else {
        return false;
    }
};

// Function to count the nummber of completed tasks and return that number.
// It goes through the entire array and checks the if the completed: content is "yes", if so it adds 1 to the tasks counter variable.
function taskCounter () {
    let tasks = 0;
    for (let i = 0; i < todoArray.length; i++) {
        if (todoArray[i].completed === "yes"){
            tasks++;
        }
    }
    return tasks;
};

// Function that adds the task as an object to the array.
// It passes the text variable to the object and then adds completed == no , because it is a newly added task and havent been interacted with yet
function addToArray (text) {
    let obj = {};
    let objText = text;
    obj['task'] = objText;
    obj['completed'] = "no";
    todoArray.push(obj);
};

// Function switches completed from yes to no. To be used when clicked on.
// Firstly it finds the tasks array index. Then it checkes the array with that index and the completed vale and changes it from yes to no or no to yes 
function completedArray (text) {
    const index = todoArray.findIndex(i => i.task === text);
    if (todoArray[index].completed === "yes") {
        todoArray[index].completed = "no";
    } else {
        todoArray[index].completed = "yes";
    };
};

/* Eventlistener to the button that adds taks to the list.
First asignes the input value to text. Checks that its not empty.
Then checks if a task is already in the array, if not. Adds the task to the array as an object.
Creates an li element and adds it to the todo Ul. Creates a span and adds the task text to it. Adds it to the li item
Then adds a Eventlistener for the task items.
if the task has the class completed it removes that class, changes the value of completed to no in the array and recounts the completed taks and shows it
else it adds the complted class, changes the value of complted to yes and recounts the compelted tasks and displays it.
Alseo clears any error messages when either is clicked.
*/
addBtn.addEventListener("click", () => {
    let text = input.value;
    if (text === "" || text == null) {
        pInfo.innerText = "You cannot add nothing, nothing is not a task that you can complete. That is only possible in Nirvana and you are not there... yet. Try to complete some more tasks to further your journey to Nirvana."
        checkIdiot();
    } else {
        if (existingTask(text) == true) {
            pInfo.innerText = "That task is already in the list!";
            checkIdiot();
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

