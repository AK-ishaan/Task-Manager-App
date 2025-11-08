// creation-popup
const popup=document.querySelector('.creation-popup');
let popupFlag =false;
const addBtn=document.querySelector('.add-btn');
const ticketarr=JSON.parse(localStorage.getItem("LStickets")) || [];
let active=false;
let lsAlert=false;

addBtn.addEventListener('click',function(){
    popupFlag=!popupFlag;
    if(popupFlag===true){
        popup.style.display='block';
    }else{
        popup.style.display='none';
    }
});
// creation-area-textbox
const textbox = document.querySelector('.creation-area');
const max = 128;

textbox.addEventListener('input', () => {
  if (textbox.innerText.length > max) {
    textbox.innerText = textbox.innerText.slice(0, max);
    alert('Character limit reached!');
  }
});

//user Priority colour
let priorityLevel= document.querySelectorAll('.priority-level');
let selectedColor='';

priorityLevel.forEach(level=>{
    level.addEventListener("click",function(){
        priorityLevel.forEach(l=>{
            l.classList.remove('active');
        })
        level.classList.add('active');
        selectedColor=level.classList[0];
       
    })
})

//Save button click
let tasktext='';
const saveBtn=document.querySelector('.save-btn');
saveBtn.addEventListener('click',function(){
    tasktext=textbox.innerText;
    //unique key generator using cdnjs
    let key=shortid();
    active=true;
    ticketCreation(tasktext,key,selectedColor);
    popup.style.display='none';
    popupFlag =false;
    lsAlert=true;
    textbox.innerText='Enter your Task here...'
    
});


//ticket creation
const main = document.querySelector('main');


function ticketCreation(textcont, key, selectedColor) {
  let ticketbox = document.createElement("div");
  ticketbox.setAttribute("class", "ticket");
  ticketbox.innerHTML = `
    <div class="ticket-priority-color" style="background-color:${selectedColor}"></div>
    <div class="ticket-id">${key}</div>
    <div class="ticket-area">${textcont}</div>
    <div class="ticket-delete">
        <i class="fa-solid fa-trash dltBtn"></i>
    </div>
  `;
  
  main.appendChild(ticketbox);
  
  //local-Storage ticket creation
  if(active==true){
  ticketarr.push({ticketID:key,textcont,ticketPriority:selectedColor});
  localStorage.setItem("LStickets",JSON.stringify(ticketarr));
  }
  // active=false;

  
  //adding changing priority colour feature
  changePriority(ticketbox)

  // adding ticket deletion feature
  dltTask(ticketbox);
  
 

  // clear active classes
  priorityLevel.forEach(act => {
    act.classList.remove("active");
  });
  if(lsAlert=false){
  alert("* Double click on delete icon to delete your task\n* Double click on task top colour to change your priority");
  }
}

//removing the task from DOM and LocalStorage
function dltTask(taskBlock) {
  const dlt = taskBlock.querySelector('.dltBtn');
  const clickedticketid = taskBlock.querySelector('.ticket-id').textContent; 

  dlt.addEventListener('dblclick', function () {
    let ticketlist = JSON.parse(localStorage.getItem("LStickets")) || [];
    const updatedList = ticketlist.filter(ele => ele.ticketID !== clickedticketid);

    localStorage.setItem("LStickets", JSON.stringify(updatedList));

    // remove the task 
    taskBlock.remove();
  });
}


//feature function for changing task priority
function changePriority(taskcont) {
  const colors = ['green', 'yellow', 'red', 'black'];
  const priorityCont = taskcont.querySelector('.ticket-priority-color');
  const ticketId = taskcont.querySelector('.ticket-id').textContent; 

  let currentColorIndex = colors.indexOf(priorityCont.style.backgroundColor);
  if (currentColorIndex === -1) currentColorIndex = 0;

  priorityCont.addEventListener('dblclick', function() {

    currentColorIndex = (currentColorIndex + 1) % colors.length;
    const newColor = colors[currentColorIndex];
    priorityCont.style.backgroundColor = newColor;

    // Update in localStorage
    let ticketList = JSON.parse(localStorage.getItem("LStickets")) || [];

    ticketList = ticketList.map(ticket => {
      if (ticket.ticketID === ticketId) {
        return { ...ticket, ticketPriority: newColor };
      }
      return ticket;
    });

    // Save back to localStorage
    localStorage.setItem("LStickets", JSON.stringify(ticketList));
  });
}


//fitering task based on priority

const filterButtons = document.querySelectorAll('.color');
let activeFilter = null;

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const clickedColor = btn.dataset.color || btn.classList[0].replace('toolbox', '');
    const tickets = document.querySelectorAll('.ticket');

    if (activeFilter === clickedColor) {
      tickets.forEach(t => (t.style.display = 'block'));
      activeFilter = null;
      return;
    }

    // Apply new filter
    activeFilter = clickedColor;
    tickets.forEach(t => {
      const ticketColor = t.querySelector('.ticket-priority-color').style.backgroundColor;
      t.style.display = ticketColor === clickedColor ? 'block' : 'none';
    });
  });
});

//localStorage.clear();

//On reload using localStoarage

function reload(){
  if(localStorage.getItem("LStickets")){
    let LSarr=JSON.parse(localStorage.getItem("LStickets"));
    LSarr.forEach(t=>{
      let LScolour=t.ticketPriority;
      let LStextcont=t.textcont;
      let LSticketID=t.ticketID;
      active=false;
      lsAlert=true;
      ticketCreation(LStextcont,LSticketID,LScolour);
      
      
    })
  
  }
}

reload();
