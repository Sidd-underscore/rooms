



let focus = true;

function onBlur() {
  focus = false;

};

let unread = 0;


function onFocus() {
  revertTitle("Rooms")
  focus = true;
  unread = 0;

};

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



var socket = io();

var socket_check = io.connect();


let offline = 'false'
function hmmmm() {
  var result = socket_check.connected;
  if (result === false) {
    offline = 'true'
    $('body').append(`<div class="load"><div style="" id="loadingDiv">
<h1 style="font-size: 75%;">🙈 It seems you are Offline. Please connect to the internet and click the button below.</h1><br>
<button onclick="window.location.reload()">Retry</button>
</div>
<div>`);
  }
}
const thin = localStorage.getItem('notifs')


const totes = window.location.href;








// ON CHANGE
const barHTML = `<div class="bar"><p>You left off here<br><p class="muted"><i>Send a message or click <span style="text-decoration: underline; cursor: pointer;" onclick="dismiss('.bar')">here</span> to dismiss this message.</p></p></div>`
let messages = document.querySelector(".messages");

socket.on(totes, function(msg) {
  if (focus === false) {
    unread = unread + 1;
    if (!document.querySelector('.bar')) {
      messages.innerHTML += barHTML;
    }
    setTitle(unread)
    if (thin === 'yes') {
      sendNotif(msg)
    }
  }
  if (msg.default === true) {
    messages.innerHTML += `<span id="msg">
  <span style="background-color: ${msg.color}" class=\"person\"><img class="pfp" src="${msg.avatar}" style="background-color: ${msg.color};">${msg.user}</span><span class="date muted"> ${msg.time} </span><br>    ${msg.msg}</span>`;

  } else if (msg.default === false) {
    messages.innerHTML += msg.msg
  }


  var objDiv = document.querySelector(".messages");
  if (focus === true) {
    objDiv.scrollTop = objDiv.scrollHeight + 10;
  }
  if (msg.user === person) {
    dismiss('.bar');
  }
});

function dismiss(identifier) {
  $(identifier).remove()

}


function video() {
  const code = makeId(10)
  window.open(`../../video/${code}`, '_blank');
  sendMsg(`<span id="msg"><span style="background-color: ${color}" class=\"person\">${person}</span><span class="date muted">` + getCoolDate() + `</span><br>    Join my video call! <button class=\"chat-btn\" onclick=\"window.open(\`../../video/${code}\`, '_blank');\">Join</button></span><br>`)
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

// Get the input field
var input = document.getElementById("chat_message");
let newLine = false
// Execute a function when the user releases a key on the keyboard
input.addEventListener('keydown', function (e) {
    // Get the code of pressed key
    const keyCode = e.which || e.keyCode;

    // 13 represents the Enter key
    if (keyCode === 13 && !e.shiftKey) {
        // Don't generate a new line
        e.preventDefault();
sendMsg()
        // Do something else such as send the message to back-end
        // ...
    }
});

$('#chat_message').on('keydown', function(event) {
  if (event.keyCode == 13 && !event.shiftKey) {
    $(this).trigger(jQuery.Event("keydown", {
      keyCode: 13, // ENTER
      shiftKey: true
    }));
  } else if (event.keyCode == 13 && event.shiftKey) {
    newLine = true

      }
});


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
      const notification = new Notification(msg.user + ' just sent a message in a room 👀', {
        body: msg.msg.replace(/<[^>]*>?/gm, ''),


        icon: msg.avatar
      });


      // close the notification after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

    }



    // show an error message
    const showError = () => {
      alert('You blocked the notifications');
    }

    // check notification permission
    let granted = false;

    if (Notification.permission === 'granted') {
      granted = true;
    } else if (Notification.permission !== 'denied') {
      let permission = await Notification.requestPermission();
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
var socket = io();
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
      console.log(this.status);
      console.log(this.getResponseHeader("Content-Type"));

      console.log(res.filesUploaded)
      socket.emit("update", {
                id: totes,
        color: color,
        default: true,
        avatar: avatar,
        time: getCoolDate(),
        user: person,
        msg: `<span id="file">        <br> <div class="file"> <div class="file-inner"><span class="material-icons-outlined">` + getFontAwesomeIconFromMIME(`${res.filesUploaded.map(({ mimetype }) => mimetype)}`) + `</span><h1><span class="file-name">` + res.filesUploaded.map(({ filename }) => filename) + '</span>    <a target="blank"  href="' + res.filesUploaded.map(({ url }) => url) + '"><span class="material-icons">launch</span></a></h1></div></div></span><br>'

      });


      var x = document.getElementById("snackbar");
      x.className = "show success";
      setTimeout(function() {
        x.className = x.className.replace("show success", "");
      }, 3000);
    }
  };
  xhttp.send();
}

function sendMsg(uh) {
  if (!uh) {

    if (person) {
      function clearcontent(element) {
        document.querySelector(element).innerHTML = "";
      }
      socket.emit("update", {
        id: totes,
        user: person,
        color: color,
        default: true,
        avatar: avatar,
        time: getCoolDate(),
        msg: updateHtmlOutput()
      });



      quill.root.innerHTML.innerHTML = "";
      clearcontent('.ql-editor')


    } else {
      var x = document.getElementById("snackbar");
      x.className = "show error";
      x.innerHTML = "ERROR: You appear to not have a nickname! Please refresh this page to give you one!"
      setTimeout(function() {
        x.className = x.className.replace("show error", "");
        x.innerHTML = "Message sent!"
      }, 3000);
    }




  } else {
    socket.emit("update", {
      id: totes,
      user: '[System Update]',
      color: color,
      avatar: avatar,
      default: false,
      time: getCoolDate(),
      msg: uh + "<br>"
    });




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
  sendMsg(`<div class="system-update"><span class="person" style="background-color: ${color}">${person}</span> just joined! ` + getFact() + ` <span class="date muted">` + getCoolDate() + `</span></div>`)
}

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState == 'hidden') {
    if (focus === true) {
      afk()
    }
  }
})




function bye() {
  sendMsg(`<div class="system-update"><span class="person" style="background-color: ${color}">${person}</span> just left!<span class="date muted">` + getCoolDate() + `</span></div>`)

}



