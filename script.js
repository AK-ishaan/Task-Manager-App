// creation-popup
const popup=document.querySelector('.creation-popup');
let popupFlag =false;
const addBtn=document.querySelector('.add-btn');

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
    ticketCreation(tasktext,key,selectedColor);
    popup.style.display='none';
    popupFlag =false;
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
  
  //adding changing priority colour feature
  changePriority(ticketbox)

  // adding ticket deletion feature
  dltTask(ticketbox);
  
 

  // clear active classes
  priorityLevel.forEach(act => {
    act.classList.remove("active");
  });
  alert("* Double click on delete icon to delete your task\n* Double click on task top colour to change your priority");

}


function dltTask(taskBlock) {
  let dlt = taskBlock.querySelector('.dltBtn');
  dlt.addEventListener('dblclick', function() {
    
    taskBlock.remove();
  });
}

//feature function for changing task priority
function changePriority(taskcont) {
  const colors = ['green', 'yellow', 'red', 'black'];
  const priorityCont = taskcont.querySelector('.ticket-priority-color');

  let currentColorIndex = colors.indexOf(priorityCont.style.backgroundColor);
  if (currentColorIndex === -1) currentColorIndex = 0;

  priorityCont.addEventListener('dblclick', function() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    priorityCont.style.backgroundColor = colors[currentColorIndex];
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
