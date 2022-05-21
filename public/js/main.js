
function load() {
  if (!avatar) {
    localStorage.setItem('avatar', 'https://rooms.cool-sidd.repl.co/img/account_placeholder.svg')
    window.location.reload()
  }
  if (!color) {
    var lol = Math.floor(Math.random() * 16777215).toString(16);

    localStorage.setItem('color', `#${lol}`);
    window.location.reload()
  } else if (!person) {
    vex.dialog.open({
      message: 'What is your nickname??????',
      input: [
        '<input name="name" style="color: #444 !important;" type="text" placeholder="John Doe" required />'
      ].join(''),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: 'Proceed ➡' }),
        //    $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
      ],
      callback: function(data) {
        if (data) {

          localStorage.setItem("person", data.name)
          window.location.reload();

        } else {

          window.location.reload();
        }

      }
    })

  }


  if (person === "Dinnerbone") {
    localStorage.setItem('person', 'ǝuoqɹǝuuᴉᗡ')
    window.reload()

  }

}


function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL }, 'google_translate_element');
}



// Get the modal
var modal = document.getElementById("settings-modal");



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
  refrsh()
  if (sessionStorage.getItem('active-chat')) {
    summon(sessionStorage.getItem('active-chat'))
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    refrsh()
    if (sessionStorage.getItem('active-chat')) {
      summon(sessionStorage.getItem('active-chat'))
    }
  }
}
// Get the button that opens the modal
var btn = document.getElementById("settings");
// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  document.body.classList.remove('active')

}









var url = "https://uselessfacts.jsph.pl/random.json?language=en";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    var data = xhr.responseText;
    var jsonResponse = JSON.parse(data);
    console.log(jsonResponse)
    document.getElementById('ff').innerHTML = jsonResponse.text
    document.getElementById('ff-source').innerHTML = '<a href="' + jsonResponse.source_url + '" target="_blank">' + jsonResponse.source + '</a>'
  }
};
xhr.send();






$(window).on('load', function() {
  setTimeout(removeLoader, 4000); //wait for page load PLUS 5 second.
});
function removeLoader() {
  $("#loadingDiv").fadeOut(500, function() {
    // fadeOut complete. Remove the loading div
    $(".load").remove(); //makes page more lightweight 
    $("body").addClass('loaded')
  });
}

function newChat() {


  vex.dialog.open({
    message: 'And so your rooms adventure commences…',
    input: [
      `        <div class="Start" >
            Start a
            <select name="type" id="choose">
               <option value="placeholder" selected disabled>choose type</option>
               <option value="video">video chat</option>
               <option value="text">text chat</option>
               <option value="todo">checklist</option>
               <option value="doc">document</option>
            </select>
            titled  <input type="text" onpaste="return false" style="color: black !important;  width: 286px;"  id="namelol" minlength="1" maxlength="25"> ?
         </div>`,

    ].join(''),
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, { text: 'Create!' }),
      $.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' })
    ],
    callback: function(data) {
      var type = data.type;

      if (!data) {
        return;
      } else if (data) {

        newChatWithInfo()
      }
    }
  })

  var contenteditable = document.querySelector('#namelol');

  contenteditable.value = 'A Very Super Awesome Room'


  contenteditable.addEventListener('keydown', (e) => {
    if (['\\'].indexOf(e.key) == -1) {
      // do something
    } else {
      e.preventDefault();
    }
  });

}

let room_name = '';



var lavatar = document.getElementById('avatar')

lavatar.src = avatar
const list = document.querySelector(".chatslist")
const select = document.querySelector('#choose');

function makeId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function newChatWithInfo() {
  const select = document.querySelector('#choose').selectedOptions[0].value;

  var raw_contenteditable = document.querySelector('#namelol').value;

  var contenteditable_lol = raw_contenteditable.replace(/'/g, "\\&apos;");
  var contenteditable = contenteditable_lol.replace(/"/g, "\\&quot;");
  if (select === 'text') {
    var new_data = [`text/${makeId(10)}`, `${contenteditable}`];

    if (localStorage.getItem('chats') == null) {
      localStorage.setItem('chats', '[]');
    }

    var old_data = JSON.parse(localStorage.getItem('chats'));
    old_data.push(new_data);

    localStorage.setItem('chats', JSON.stringify(old_data));
    refrsh()


  } else if (select === 'video') {
    var new_data = [`video/${makeId(10)}`, `${contenteditable}`];

    if (localStorage.getItem('chats') == null) {
      localStorage.setItem('chats', '[]');
    }

    var old_data = JSON.parse(localStorage.getItem('chats'));
    old_data.push(new_data);

    localStorage.setItem('chats', JSON.stringify(old_data));
    refrsh()

  } else if (select === 'todo') {
    var new_data = [`checklist/${makeId(10)}`, `${contenteditable}`];

    if (localStorage.getItem('chats') == null) {
      localStorage.setItem('chats', '[]');
    }

    var old_data = JSON.parse(localStorage.getItem('chats'));
    old_data.push(new_data);

    localStorage.setItem('chats', JSON.stringify(old_data));
    refrsh()

  } else if (select === 'doc') {
    var new_data = [`docs/#${makeId(10)}`, `${contenteditable}`];

    if (localStorage.getItem('chats') == null) {
      localStorage.setItem('chats', '[]');
    }

    var old_data = JSON.parse(localStorage.getItem('chats'));
    old_data.push(new_data);

    localStorage.setItem('chats', JSON.stringify(old_data));
    refrsh()

  } else {
    alert('Select a type!')
  }
}
var mainthinglol = document.querySelector('.chats-div')


$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
var chats = JSON.parse(localStorage.getItem('chats'));
refrsh()
function refrsh() {
  $(".channel-name").innerHTML = localStorage.getItem('name')
  $(".channel-logo").src = localStorage.getItem('avatar')
  var chats = JSON.parse(localStorage.getItem('chats'));
  if (localStorage.getItem('chats') != null) {
    if (!chats) {
      list.innerHTML = "<i class='muted'>Nothing joined... yet</i>"
    } else {
      list.innerHTML = ''
      chats.forEach(element => {
        var name = element[1].replace("\\", "");
        const text = '<li class="chat sidebar-list-item"  onmouseout=\'dismiss(`[data-action-id="' + element[0] + '"]`)\' onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\' data-name="' + element[1] + '" data-id="' + element[0] + '" >          <a href="#" onclick=\'summon(' + JSON.stringify(element) + ')\' class="sidebar-link">      <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg>                      <div class="hidden-sidebar" data-toggle="tooltip" data-placement="top" title="' + name + '">' + name + `</div>           </a>         <div class="actions"` + 'onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\'' + `style="display: none;" data-action-id="${element[0]}" onclick="deleteRoom(['${element[0]}', '${element[1]}'])"><i class="fas danger delete fa-trash-alt"></i></div> </li>`
        const video = '<li class="chat sidebar-list-item" onmouseout=\'dismiss(`[data-action-id="' + element[0] + '"]`)\' onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\' data-name="' + element[1] + '" data-id="' + element[0] + '" >          <a href="#" onclick=\'summon(' + JSON.stringify(element) + ')\' class="sidebar-link">      <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l2.29 2.29c.63.63 1.71.18 1.71-.71V8.91c0-.89-1.08-1.34-1.71-.71L17 10.5z"/></svg>                   <div class="hidden-sidebar" data-toggle="tooltip" data-placement="top" title="' + name + '">' + name + `</div>           </a>         <div class="actions"` + 'onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\'' + `style="display: none;" data-action-id="${element[0]}"  onclick="deleteRoom(['${element[0]}', '${element[1]}'])"><i class="fas danger delete fa-trash-alt"></i></div> </li>`

        const checklist = '<li class="chat sidebar-list-item" onmouseout=\'dismiss(`[data-action-id="' + element[0] + '"]`)\' onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\' data-name="' + element[1] + '" data-id="' + element[0] + '" >          <a href="#" onclick=\'summon(' + JSON.stringify(element) + ')\' class="sidebar-link">      <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/><path d="M22,7h-9v2h9V7z M22,15h-9v2h9V15z M5.54,11L2,7.46l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L5.54,11z M5.54,19L2,15.46 l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L5.54,19z"/></svg>                   <div class="hidden-sidebar" data-toggle="tooltip" data-placement="top" title="' + name + '">' + name + `</div>           </a>         <div class="actions"` + 'onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\'' + `style="display: none;" data-action-id="${element[0]}"  onclick="deleteRoom(['${element[0]}', '${element[1]}'])"><i class="fas danger delete fa-trash-alt"></i></div> </li>`
        const doc = '<li class="chat sidebar-list-item" onmouseout=\'dismiss(`[data-action-id="' + element[0] + '"]`)\' onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\' data-name="' + element[1] + '" data-id="' + element[0] + '" >          <a href="#" onclick=\'summon(' + JSON.stringify(element) + ')\' class="sidebar-link">      <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>                   <div class="hidden-sidebar" data-toggle="tooltip" data-placement="top" title="' + name + '">' + name + `</div>           </a>         <div class="actions"` + 'onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\'' + `style="display: none;" data-action-id="${element[0]}"  onclick="deleteRoom(['${element[0]}', '${element[1]}'])"><i class="fas danger delete fa-trash-alt"></i></div> </li>`
        const wut = '<li class="chat sidebar-list-item" onmouseout=\'dismiss(`[data-action-id="' + element[0] + '"]`)\' onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\' data-name="' + element[1] + '" data-id="' + element[0] + '" >          <a href="#" onclick=\'summon(' + JSON.stringify(element) + ')\' class="sidebar-link">     <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>                  <div class="hidden-sidebar" data-toggle="tooltip" data-placement="top" title="' + name + '">' + name + `</div>           </a>         <div class="actions"` + 'onmouseover=\'show(`[data-action-id="' + element[0] + '"]`)\'' + `style="display: none;" data-action-id="${element[0]}"  onclick="deleteRoom(['${element[0]}', '${element[1]}'])"><i class="fas danger delete fa-trash-alt"></i></div> </li>`

        if (element[0].startsWith('text/')) {
          list.innerHTML += text
        } else if (element[0].startsWith('video/')) {
          list.innerHTML += video
        } else if (element[0].startsWith('checklist/')) {
          list.innerHTML += checklist
        } else if (element[0].startsWith('docs/')) {
          list.innerHTML += doc
        } else {
          list.innerHTML += wut
        }
      });
    }
  } else {
    list.innerHTML = "<i class='muted'>Nothing joined... yet</i>"
  }
  $('[data-toggle="tooltip"]').tooltip();

}


const bai = document.querySelector('.temp')

function show(identifier) {
  document.querySelector(identifier).style.display = 'inherit';
}


function summon(url) {

  var element = url;
  sessionStorage.setItem("active_chat", JSON.stringify(url))
  document.title = getRoom() + ' - Rooms';
  let room_name = url[1]

  mainthinglol.style.display = 'block';
  bai.style.display = 'none';
  const active = document.querySelector('.active');
  if (active) {
    active.classList.remove('active');
  }
  var html = '<div   style="display: block; height: 94%; width: 100%;"  data-frame="true" data-frame-id="' + element[0] + '" style="display: none;"><span><b>' + element[1].replace("\\", "") + '</b></span><span onclick="deSummon(`' + element[0] + '`)" class="close">×</span><iframe onclick="focus(`' + element + '`)"  src="/' + element[0] + '"/></div>'
  if (url[0].startsWith('video/')) {
    var element = url;

    mainthinglol.innerHTML = html
  } else if (url[0].startsWith('text/')) {
    var element = url;
    mainthinglol.innerHTML = html
  } else if (url[0].startsWith('checklist/')) {
    var element = url;
    mainthinglol.innerHTML = html
  } else if (url[0].startsWith('docs/')) {
    var element = url;
    mainthinglol.innerHTML = html
  }
  document.querySelector('[data-id="' + url[0] + '"]').classList.add('active');
  if (document.querySelector('.temp')) {
    document.querySelector('.temp').style.display = 'none'
  }
  
  if(document.querySelector("html").classList.contains("mobile")){
  document.querySelector('aside').style.setProperty("display", "none", "important");
    document.querySelector('div .main').style.setProperty("display", "inherit", "important");
    document.querySelector('div .main').style.setProperty("height", "100vh", "important");

}
}

function focus(thing) {
  document.querySelector('[data-id="' + thing + '"]').classList.add('active');
  if (document.querySelector('.temp')) {
    document.querySelector('.temp').style.display = 'none'
  }

}


const name = document.querySelector('.channel-name')
name.textContent = person

function deSummon(url) {
  reallyRevertTitle()
  $('[data-frame-id="' + url + '"]').remove()
  document.querySelector('.chats-div').style.display = 'none';

  if (document.querySelector('[data-id="' + url + '"]')) {
    document.querySelector('[data-id="' + url + '"]').classList.remove('active');
  }
  if (!document.querySelector('[data-frame="true"]')) {
    document.querySelector('.temp').style.display = 'block';
  }
  if(document.querySelector("html").classList.contains("mobile")){
  document.querySelector('aside').style.setProperty("display", "flex", "important");
    document.querySelector('div .main').style.setProperty("display", "none", "important");

}
}

let ctrl = 'Control'
if (navigator.userAgent.indexOf('Mac OS X') != -1) {
  ctrl = 'Meta'
} else {
  ctrl = 'Control'
}

// Keep track of clicked keys
var isKeyPressed = {
  'Control': false,
  'Shift': false, // ASCII code for 'a'
  'b': false, // ASCII code for 'b'
  // ... Other keys to check for custom key combinations
};

document.onkeydown = (keyDownEvent) => {


  // Track down key click
  isKeyPressed[keyDownEvent.key] = true;
  //console.log(keyDownEvent.key)
  // Check described custom shortcut
  if (isKeyPressed["Control"] && isKeyPressed["Shift"]) {
  } else if (isKeyPressed["Control"] && isKeyPressed["r"]) {
    window.location.reload()
  }
};

document.onkeyup = (keyUpEvent) => {


  // Track down key release
  isKeyPressed[keyUpEvent.key] = false;
};

const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const join = parameters.get('join')
if (join) {
  var namelol = JSON.stringify(parameters.get('name').replace(/``+/g, '').replace('[', '').replace(']', '').replace(/``+/g, ''))
  var id = JSON.stringify(parameters.get('id')).replace(/``+/g, '').replace('[', '').replace(']', '').replace(/``+/g, '')
}
if (join) {
  var chats = localStorage.getItem('chats');

  if (localStorage.getItem('chats') == null) {
    localStorage.setItem('chats', '[]');
  }
  var dta = `[${id}, ${namelol}]`;
  var data = JSON.parse(dta);

  if (!data.some(datal => datal === data)) {

    inviteModal(data)


  } else {
    summon(data)
  }
  var newURL = location.href.split("?")[0];
  window.history.pushState('object', document.title, newURL);
}

function dismiss(identifier) {
  document.querySelector(identifier).style.display = 'none';
}

function getArray() {
  return JSON.parse(localStorage.getItem('chats'));
}

function deleteRoom(data) {
  let chats = getArray();
  vex.dialog.open({
    message: 'Are you sure?',
    input: [
      'Are you sure you want to delete <b>' + data[1] + '</b>?'
    ].join(''),
    buttons: [
      $.extend({}, vex.dialog.buttons.NO, { text: 'NO!!!' }),
      $.extend({}, vex.dialog.buttons.YES, { text: 'Yes' })
    ],
    callback: function(datalol) {
      if (!datalol) {
        return;
      } else {

        deSummon(data[0])
        let deleteitnow = chats.filter(room => room[0] !== data[0]);

        localStorage.setItem('chats', JSON.stringify(deleteitnow));
        refrsh()
        reallyRevertTitle()
      }

    }
  })

}
var list_items = document.querySelector('.chat')
var io = document.getElementById("menu");

var i = document.getElementById("menu").style;
if (list.addEventListener) {
  list.addEventListener('contextmenu', function(e) {
    console.log(e.path)
    var path = e.path;
    let javascript_freelancers = path.filter(function(pathl) {
      return pathl.classList.includes("sidebar-list-item");
    });

    console.log(javascript_freelancers);


    var posX = e.clientX;
    var posY = e.clientY;
    var roomidthing = id
    var roomnamething = name
    var room = `[${JSON.stringify(roomidthing)}, ${JSON.stringify(roomnamething)}]`;
    document.getElementById('menu-invite').setAttribute("onclick", `invite(${room})`);
    document.getElementById('menu-delete').setAttribute("onclick", `deleteRoom(${room})`);
    menu(posX, posY);
    e.preventDefault();
  }, false);
  document.addEventListener('click', function(e) {
    i.opacity = "0";
    setTimeout(function() {
      i.visibility = "hidden";
    }, 501);
  }, false);

} else {
  document.attachEvent('oncontextmenu', function(e) {
    var posX = e.clientX;
    var roomidthing = id

    var roomnamething = name
    var room = `[${JSON.stringify(roomidthing)}, ${JSON.stringify(roomnamething)}]`;
    document.getElementById('menu-invite').setAttribute("onclick", `invite(${room})`);
    document.getElementById('menu-delete').setAttribute("onclick", `deleteRoom(${room})`);
    var posY = e.clientY;
    menu(posX, posY);
    e.preventDefault();
  });
  document.attachEvent('onclick', function(e) {
    i.opacity = "0";
    setTimeout(function() {
      i.visibility = "hidden";
    }, 501);
  });
}

function menu(x, y) {
  i.top = y + "px";
  i.left = x + "px";
  i.visibility = "visible";
  i.opacity = "1";
}


function inviteModal(data) {
  var invite_modal = document.getElementById("join-modal");
  window.onclick = function(event) {
    if (event.target == modal) {
      alert('Reloading window to apply changes...')
      window.location.reload()
    }
  }
  invite_modal.style.display = 'block';
  var name = document.getElementById('name')
  name.innerText = data[1]
  var push = document.getElementById("push");
  push.addEventListener("click", function(e) {
    invite_modal.style.display = 'none'
    var old_data = JSON.parse(localStorage.getItem('chats'));
    old_data.push(data);

    localStorage.setItem('chats', JSON.stringify(old_data));
    refrsh()
    summon(data)
    console.log('lol')
  })

}


var invite_modal = document.getElementById("join-modal");
window.onclick = function(event) {
  if (event.target == invite_modal) {
    invite_modal.style.opacity = 0;
  }
}