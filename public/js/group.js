let focus = true;

function onBlur() {
  focus = false;

};

const totes = window.location.href.replaceAll('.', '').slice(-10);


let unread = 0;
const config = {
  apiKey: "AIzaSyA09XIhl6Oqn1LOqYFU0ZUzrhiHgNAlRyk",
  authDomain: "rooms-326702.firebaseapp.com",
  databaseURL: "https://rooms-326702-default-rtdb.firebaseio.com",
  projectId: "rooms-326702",
  storageBucket: "rooms-326702.appspot.com",
  messagingSenderId: "824085801611",
  appId: "1:824085801611:web:c6eb92a61624ddbe50428e",
  measurementId: "G-DNQFMVDRCJ",
  databaseURL: "https://rooms-326702-default-rtdb.firebaseio.com"
};



firebase.initializeApp(config);
const db = firebase.database();

var ref = firebase.database().ref();
ref = ref.child(totes);

console.log('Firebase data: ', ref.toString());

function onFocus() {
  revertTitle("Rooms")
  focus = true;
  unread = 0;

};


const fetchChat = db.ref('messages/' + totes);

fetchChat.on("child_added", function(snapshot) {
  const messages = snapshot.val();

  const message = `<li><img src="${messages.avatar}"><span style="background-color: ${messages.color}">${messages.person}:</span> <span class="date muted">` + messages.date + `</span>${messages.val}</li>`;
  document.querySelector(".messages").innerHTML += message;





  const barHTML = `<div class="bar"><p>You left off here<br><p class="muted"><i>Send a message or click <span style="text-decoration: underline; cursor: pointer;" onclick="dismiss('.bar')">here</span> to dismiss this message.</p></p></div>`

  if (focus === false) {
    unread = unread + 1;
    if (!document.querySelector('.bar')) {
      messages.innerHTML += barHTML;
    }
    setTitle(unread)
    if (thin === 'yes') {
      sendNotif(message)
    }
  }



  var objDiv = document.querySelector(".messages");
  if (focus === true) {
    objDiv.scrollTop = objDiv.scrollHeight + 10;
  }
  if (message.person === person) {
    dismiss('.bar');
  }
});

if (/*@cc_on!@*/false) { // check for Internet Explorer
  document.onfocusin = onFocus;
  document.onfocusout = onBlur;
} else {
  window.onfocus = onFocus;
  window.onblur = onBlur;
}

function getFontAwesomeIconFromMIME(mimeType) {
  // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
  var icon_classes = {
    image: "image",
    audio: "graphic_eq",
    video: "movie",
    "application/pdf": "picture_as_pdf",
    "application/msword": "article",
    "application/vnd.ms-word": "article",
    "application/vnd.oasis.opendocument.text": "article",
    "application/vnd.openxmlformats-officedocument.wordprocessingml":
      "article",
    "application/vnd.ms-excel": "article",
    "application/vnd.openxmlformats-officedocument.spreadsheetml":
      "article",
    "application/vnd.oasis.opendocument.spreadsheet": "article",
    "application/vnd.ms-powerpoint": "slideshow",
    "application/vnd.openxmlformats-officedocument.presentationml":
      "slideshow",
    "application/vnd.oasis.opendocument.presentation": "slideshow",
    "text/plain": "article",
    "text/html": "code",
    "text/css": "code",
    "text/javascript": "code",
    "application/json": "code",
    "application/gzip": "folder_zip",
    "application/zip": "folder_zip",
    "application/x-zip-compressed": "folder_zip"
  };

  for (var key in icon_classes) {
    if (icon_classes.hasOwnProperty(key)) {
      if (mimeType.search(key) === 0) {
        // Found it
        return icon_classes[key];
      }
    } else {
      return "description";
    }
  }
}



const thin = localStorage.getItem('notifs')




// Get the input field
var input = document.getElementById("chat_message");
let newLine = false
input.addEventListener('keydown', function(e) {
  const keyCode = e.which || e.keyCode;

  if (keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
    sendMsg()

  }
});




function dismiss(identifier) {
  $(identifier).remove()

}


$('.scrollleft').click(function() {
  $('.stuff').animate({
    scrollLeft: '-=153'
  }, 1000, 'swing');
});
$('.scrollright').click(function() {
  $('.stuff').animate({
    scrollLeft: '+=153'
  }, 1000, 'swing');
});



var editor = localStorage.getItem('editor');
var editorthing = document.getElementById('chat_message');
var send = document.getElementById('send')

var quill = new Quill('#chat_message', {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'code-block', 'link', { 'script': 'super' }, { 'script': 'sub' }],


    ]
  },
  placeholder: 'Message Room!',
  theme: 'bubble'
});



function getCoolDate() {
  var d = new Date()
  var output = d.toLocaleString();       // -> "2/1/2013 7:37:08 AM"


  return output;
}





function afk() {
  focus = false;
  var afkthing = `<div class="system-update"><span class="person" style="background-color: ${color}">${person}</span> just went AFK. <span class="date muted">` + getCoolDate() + `</span></div>`
  sendMsg(afkthing)
  $('body').append(`<div class="load"><div style="" id="loadingDiv">
<h1 style="font-size: 75%;">😴 It seems you are AFK. Ready to come back?</h1><br>
<button onclick="noAfk()">Yes</button>
</div>
<div>`);

}

function noAfk() {
  focus = true;
  var afkthing = `<div class="system-update"><span class="person" style="background-color: ${color}">${person}</span> just came back from being AFK. Say hi!<span class="date muted">` + getCoolDate() + `</span></div>`;
  sendMsg(afkthing)
  $("#loadingDiv").fadeOut(500, function() {
    // fadeOut complete. Remove the loading div
    $(".load").remove(); //makes page more lightweight 
  });
}

function sendNotif(msg) {
  (async () => {


    // create and show the notification
    const showNotification = () => {
      // create a new notification
      var n = window.webkitNotifications.createNotification(msg.avatar, msg.person + ' sent a message in a Room', msg.val.replace(/<[^>]*>?/gm, ''));
      n.onclick = function(x) { window.focus(); this.close(); };



      // close the notification after 10 seconds
      setTimeout(() => {
        n.close();
      }, 5000);

    }



    // show an error message
    const showError = () => {
      alert('You blocked the notifications');
    }

    // check notification permission
    let granted = false;

    if (window.webkitNotifications.permission === 'granted') {
      granted = true;
    } else if (window.webkitNotifications.permission !== 'denied') {
      let permission = await window.webkitNotifications.requestPermission();
      granted = permission === 'granted' ? true : false;
    }

    // show notification or error
    granted ? showNotification() : showError();

  })();
}



var length = quill.getLength();

function tryBeta() {
  alert('nothing to try...\n\n\n\n\n\n\n\n\n\nyet')
}
// Return the HTML content of the editor
function getQuillHtml() {
  return quill.root.innerHTML;
}



function updateHtmlOutput() {
  let html = getQuillHtml();
  return html;

}






function image() {
  const apikey = 'AUvtAL5uKQduVuTrGbDapz';
  const client = filestack.init(apikey);
  const options = {
    fromSources: ["local_file_system", "imagesearch", "url", "unsplash", "webcam", "video", "audio"],
    maxFiles: 1,
    uploadInBackground: false,
    onOpen: () => console.log('opened!'),
    onUploadDone: (res) => file(res),
    //onUploadDone: (res) => console.log(res),
  };
  client.picker(options).open();
};


function file(res) {

  var url = res.filesUploaded.map(({
    url
  }) => url);
  var xhttp = new XMLHttpRequest();
  xhttp.open('HEAD', url);
  xhttp.onreadystatechange = function() {
    if (this.readyState == this.DONE) {
      var person = localStorage.getItem('person')
      var avatar = localStorage.getItem('avatar')
      var color = localStorage.getItem('color')
      var val = `<span id="file">        <br> <div class="file"> <div class="file-inner"><span class="material-icons-outlined">` + getFontAwesomeIconFromMIME(`${res.filesUploaded.map(({ mimetype }) => mimetype)}`) + `</span><h1><span class="file-name">` + res.filesUploaded.map(({ filename }) => filename) + '</span>    <a target="blank"  href="' + res.filesUploaded.map(({ url }) => url) + '"><span class="material-icons">launch</span></a></h1></div></div></span><br>'
      var date = getCoolDate()
      const timestamp = Date.now();
      console.log(val + person + avatar + color)

      //auto scroll to bottom
      document.querySelector(".messages").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

      // create db collection and send in the data
      db.ref('messages/' + totes + '/' + timestamp).set({ person, val, avatar, color, date });



    }
  };
  xhttp.send();
}



function sendMsg(uh) {
  if (!uh) {
    var person = localStorage.getItem('person')
    var avatar = localStorage.getItem('avatar')
    var color = localStorage.getItem('color')
    var val = quill.root.innerHTML.replace("<p><br></p>", "");

    var date = getCoolDate()
    const timestamp = Date.now();
    console.log(val + person + avatar + color)

    //auto scroll to bottom
    document.querySelector(".messages").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref('messages/' + totes + '/' + timestamp).set({ person, val, avatar, color, date });


    quill.root.innerHTML = "";
  } else {


    var val = uh
    const timestamp = Date.now();
    var date = getCoolDate()

    var person = '[SYSTEM UPDATE]'
    var avatar = 'https://roomss.tk/img/bot.svg'
    var color = '#2f80ec'
    //auto scroll to bottom
    document.querySelector(".messages").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref('messages/' + totes + '/' + timestamp).set({ person, val, avatar, color, date });


    quill.root.innerHTML = "";

  }
}


window.onload(welcome())
window.onload(setInterval(hmmmm, 1000))

function getFact() {
  var funfacts = [
    "We hope you brought pizza :D",
    "Please follow the glorious <a href=\"https://nohello.net\" target=\"_blank\">no hello</a> rules.",
    "Have fun!"

  ]
  let thing = funfacts[Math.floor(Math.random() * funfacts.length)];
  return thing;

}


function welcome() {
  getFact()
  sendMsg(`<p style="    top: 11px;
    position: relative;" ><span class="person" style="background-color: ${color}">${person}</span> just joined! ` + getFact() + ` </p>`)
}






function bye() {
  sendMsg(`<p style="    top: 11px;
    position: relative;"><span class="person" style="background-color: ${color}">${person}</span> just left!</p>`)

}