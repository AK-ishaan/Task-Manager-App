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

//Save button click
let tasktext='';
const saveBtn=document.querySelector('.save-btn');
saveBtn.addEventListener('click',function(){
    tasktext=textbox.innerText;
    //unique key generator using cdnjs
    let key=shortid();
    ticketCreation(tasktext,key);
    popup.style.display='none';
    popupFlag =false;
    textbox.innerText='Enter your Task here...'
});


//ticket creation
const main=document.querySelector('main')

function ticketCreation(textcont,key){
  let ticketbox=document.createElement("div");
  ticketbox.setAttribute("class","ticket");
  ticketbox.innerHTML=`<div class="ticket-priority-color"></div>
          <div class="ticket-id">ID : ${key}</div>
          <div class="ticket-area">${textcont}</div>
          <div class="ticket-delete">
              <i class="fa-solid fa-trash"></i>
          </div>`
    main.appendChild(ticketbox);
}