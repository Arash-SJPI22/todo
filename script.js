const input = document.querySelector("#myInput");
const addBtn = document.querySelector("#myButton");
const todoList = document.querySelector("#todoList");
const doneList = document.querySelector("#doneList");
const pTaskCount = document.querySelector("#pTaskCount");
const pInfo = document.querySelector("#pInfo");
const clearAllbtn = document.querySelector("#clearAllBtn");
const todoArray = [];

// For the idiots
let idiotCounter = 0;
const idiotArray = ["No, that is not permited.", "Sir, SIR! SIIIR! DONT DO THAT!", "NO NO BAD MONKEY!", "Have you tried some thing else?", "Shouldn't you buy a new mouse by now?", "Hey this isn't a slot machine, stop pressing the button!", "WHAT... ARE... YOU... DOING?!", "Monkey want a banana?", "Have you seen a computer beore? Are you sure?", "For godsake man, get a hold of your self!", "no ... no ... no ... still no ...", "Pss pss kitty get of the computertable, bad kitty!", "Madam, MADAM! PLEASE, leave the button alone.", "PRESS THAT BUTTON ONE MORE TIME, ONE MORE TIME. I DARE YOU, SEE WHAT HAPPENS!"];

function checkIdiot() {
    idiotCounter++;
    if (idiotCounter > 3 && idiotCounter < 29) {
        let rand = Math.round(Math.random() * 12);
        pInfo.innerText = idiotArray[rand];
    } else if (idiotCounter == 29) {
        pInfo.innerText = idiotArray[13];
    } else if (idiotCounter == 30) {
        addBtn.hidden = "hidden";
        pInfo.innerText = "Look at what you made me do. Now go outside and play with sticks...";
    }
};

// To check if the inputed text already exists in the array as a task 
// checks the array to see if the text matches any task: value. If it dose it will have an array index of 0 or above and therefore return true. If it dosent exist the answer will be -1 and it will return false
function existingTask (text) {
    if ((todoArray.findIndex(i => i.task === text)) >= 0) {
        return true;
    } else {
        return false;
    }
};

// Function to count the nummber of completed tasks and return that number.
// It goes through the entire array and checks the if the completed: content is "yes", if so it adds 1 to the tasks counter variable. There is easyer ways to do this, but the assignemt was to use an array with objects.
function taskCounter () {
    let tasks = 0;
    for (let i = 0; i < todoArray.length; i++) {
        if (todoArray[i].completed === "yes"){
            tasks++;
        }
    }
    pTaskCount.innerText = tasks + " tasks completed";
};

// Function that adds the task as an object to the array.
// It passes the text variable to the object and then adds completed == no, because it is a newly added task and havent been interacted with yet
function addToArray (text) {
    const obj = {};
    obj.task = text;
    obj.completed = "no";
    todoArray.push(obj);
};


// Function that removes an object from the array
// It finds the index of the object and removes it from the array and calls tha taskCounter to recount the completed tasks if perhaps the task that is removed might have been a completed task
function rmvFromArray (text) {
    const index = todoArray.findIndex(i => i.task === text)
    todoArray.splice(index, 1);
    taskCounter();
};

// Function switches completed from yes to no and no to yes To be used when clicked on.
// Firstly it finds the tasks array index. Then it checkes the array with that index and the completed vale and changes it from yes to no or no to yes 
function completedArray (text) {
    const index = todoArray.findIndex(i => i.task === text);
    if (todoArray[index].completed === "yes") {
        todoArray[index].completed = "no";
    } else {
        todoArray[index].completed = "yes";
    };
};

// Show task compelted when the pages is loaded
taskCounter();
// Clears the input from text if page is reloded
input.value = "";

/* Eventlistener to the button that adds taks to the list.
First asignes the input value to text. Checks that its not empty.
Then checks if a task is already in the array, if not. Adds the task to the array as an object.
Creates an li element and adds it to the todo Ul. Creates a span and adds the task text to it. Creates another span (for the remove "button") adds a class to it and the icon.
Adds both spans to the li item
Then adds a Eventlistener for the task items.
if the task has the class completed it removes that class, changes the value of completed to no in the array and recounts the completed taks and shows it
else it adds the complted class, changes the value of complted to yes and recounts the compelted tasks and displays it.
Alseo clears any error messages when either is clicked.
Adds another eventlistern for the remove "button" (the second span)
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
            const itemLabel = document.createElement("span");
            //const itemLabel2 = document.createElement("span");
            const itemDelBtn = document.createElement("button");
            
            todoList.appendChild(item);

            // itemLabel.setAttribute("class", "todoLi");
            itemLabel.innerText = text;
        
            //itemLabel2.setAttribute("class"", "material-symbols-outlined");
            itemDelBtn.setAttribute("class", "material-symbols-outlined");
            //itemLabel2.innerText = "delete";
            itemDelBtn.innerText = "delete";
        
            item.appendChild(itemLabel);
            //item.appendChild(itemLabel2);
            item.appendChild(itemDelBtn);

            itemLabel.addEventListener("click", () => {
                if(itemLabel.getAttribute("class") === "completed") {
                    pInfo.innerText = "";
                    itemLabel.setAttribute("class", "");
                    todoList.appendChild(item);
                    completedArray(itemLabel.innerText);
                    taskCounter();
                } else {
                    pInfo.innerText = "";
                    itemLabel.setAttribute("class", "completed");
                    doneList.appendChild(item);
                    completedArray(itemLabel.innerText);
                    taskCounter();
                }
            });

            
            itemDelBtn.addEventListener("click", () => {   
                rmvFromArray(text);                
                item.remove();
            });
        };
    };
    input.value = "";
});

// Removed all of doneList UL's li
/* Goes through the todoArray from the end (because splice messes up the index if you go from 0 to todoArray.length) if the arrayobject is compelted, remove it.
* After all are removed from the array then removes all of the doneList ul by removing each child one at the time until none are left. Then calls the taskCounter function to
* recalculate how many task are left. Could also just sett the pTaskCount to 0, but its safer this way
*/
clearAllbtn.addEventListener("click", () => {
    for (let f=todoArray.length - 1; f >= 0; f--){
        if (todoArray[f].completed === "yes") {
            todoArray.splice(f, 1);
        };
    };
    while (doneList.hasChildNodes()) {
        doneList.removeChild(doneList.firstChild);
    };
    taskCounter();
});