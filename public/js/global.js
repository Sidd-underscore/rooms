if (sessionStorage.getItem('active_chat')) {
  var  raw_contenteditable = sessionStorage.getItem('active_chat')


  var active_chatl = JSON.parse(raw_contenteditable);

}
const person = localStorage.getItem("person");

const color = localStorage.getItem('color')

const avatar = localStorage.getItem('avatar')



var key = "AIzaSyA09XIhl6Oqn1LOqYFU0ZUzrhiHgNAlRyk"

function invite(codel) {
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');
  var urlthing = document.querySelector('.url')

  shareDialog.classList.add('is-open');

closeButton.addEventListener('click', event => {
  shareDialog.classList.remove('is-open');
});
  if (!codel) {
      var active_chat = 'join=true&id=' + active_chatl[0] + '&name=' + active_chatl[1]

  } else {
      var active_chat = 'join=true&id=' + codel[0] + '&name=' + codel[1]

  }
  var url = "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=" + key;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var datalol = JSON.parse(xhr.responseText);

urlthing.textContent = datalol.shortLink

    }
  };

  var data = `{
   "suffix": {
     "option": "UNGUESSABLE"
   },
    "dynamicLinkInfo": {
    "link": 'https://roomss.tk/app?${active_chat}',
    "domainUriPrefix": "https://invite.roomss.tk/join"

  }
}`;

  console.log(active_chatl)
  
  xhr.send(data);

}

function getRoom() {
  var room_name = JSON.parse(sessionStorage.getItem('active_chat'));
  return room_name[1].replace("\\", "").replace("\\", "");
}
var title = document.getElementById("title");


function setTitle(unread) {
      window.top.document.title = "(" + unread + ") " + getRoom() + " - Rooms"

}

function revertTitle() {
      window.top.document.title = getRoom() + " - " + 'Rooms'

}

function reallyRevertTitle() {
        window.top.document.title = 'Rooms'
        sessionStorage.setItem('active_chat', '')

} 