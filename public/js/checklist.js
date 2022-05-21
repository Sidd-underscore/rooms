//progress bar
var progress = document.querySelector('.progress-inner')
var completed = document.querySelectorAll('.checked')


// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var btn = document.getElementsByClassName('close')

for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function(e) {
    e.currentTarget.parentNode.remove();
  }, false);
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul#myUL');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI' && ev.target.className != 'close') {
    socketIt('2', ev.target.id)


  } else if (ev.target.tagName === 'SPAN' && ev.target.className != 'close') {
    socketIt('2', ev.path[1].id)


  }
}, false);

var listo = document.querySelector('ul.completed-tasks');
listo.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI' && ev.target.className != 'close') {
    socketIt('3', ev.target.id)
  } else if (ev.target.tagName === 'SPAN' && ev.target.className != 'close') {
    socketIt('3', ev.path[1].id)


  }
}, false);

function checked(idl) {
  var id = document.getElementById(idl)
  id.classList.toggle('checked');

  id.classList.toggle('task');
  $('#' + idl).appendTo(".completed-tasks");
  checkIfNoMoreTodo()
}

function check(idl) {
  var id = document.getElementById(idl)
  id.classList.toggle('checked');
  id.classList.toggle('task');
  $('#' + idl).appendTo("#myUL");
  checkIfNoMoreTodo()
}
function checkIfNoMoreTodo() {
  var tasks = document.querySelector('.task'),
    status = document.querySelector('.status')
  if (!tasks) {
    status.style.display = 'flex';
    var files = ["/img/relax.svg", "/img/relax(1).svg", "/img/relax(2).svg"];
    var file = files[Math.floor(Math.random() * files.length)];
    status.innerHTML = '<div><img src="' + file + '" onclick="confettiIt()"><br>You finished all your tasks! <br> <span class="muted">Reward yourself and chill out</span></div>';
    confettiIt()
  } else {
    status.style.display = 'none';


    var things = document.querySelectorAll('.task');
    for (i = 0; i < things.length; i++) {
      $(things).appendTo('#myUL')
    }

  }
  progressthing()

}
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
// Create a new list item when clicking on the "Add" button
function newElement() {
    var inputValue = document.getElementById("myInput").value;

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    var li = document.createElement("li");
    var t = document.createTextNode(inputValue);
    li.className = "task tasks"
    var container = document.createElement("SPAN")
    container.appendChild(t);
    container.className = "text-container";

    li.appendChild(container)
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    li.id = makeId(25)
    span.appendChild(txt);
    li.appendChild(span);

    //   document.getElementById("myUL").appendChild(li);


    socketIt('1', li)


  }



}

function progressthing() {
  var thing1 = document.querySelectorAll('.checked').length,
    task = document.querySelectorAll('.task').length,
    nottask = document.querySelectorAll('.tasks').length;
  var percent = thing1 / nottask * 100;

  if (task === 0) {
    progress.style.width = '100%';

  } else {
    progress.style.width = percent + '%';
  }
}

function confettiIt() {
  var duration = 15 * 100;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

document.getElementById("arrow").addEventListener("click", function() {
  resize(this)
});

document.getElementById("down-arrow").addEventListener("click", function() {
  onresize(this)
});

function resize(arrow) {
  var container = document.querySelector('.completed')
  container.style.height = 'calc(100vh - 115px)';
  arrow.style.display = "none"
  document.getElementById("down-arrow").style.display = 'flex'

}

function onresize(arrow) {
  var container = document.querySelector('.completed')
  container.style.height = '';
  arrow.style.display = "none"
  document.getElementById("arrow").style.display = 'block'


}

document.querySelector('#myInput').addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    newElement()
  }
});
function getCoolDate() {
  var d = new Date()
  var output = d.toLocaleString();       // -> "2/1/2013 7:37:08 AM"


  return output;
}

const totes = window.location.href;

var socket = io();


function socketIt(action, stuffo) {
  if (action === '1') {
    stuffo = stuffo.outerHTML
  }
  socket.emit("update-v2", {
    id: totes,
    type: "checklist",
    color: color,
    default: true,
    avatar: avatar,
    time: getCoolDate(),
    user: person,
    action: action,
    stuff: stuffo

  });

}
var list = document.querySelector('ul#myUL');

socket.on(totes, function(info) {
  if (info.type === 'checklist') {
    console.log(JSON.stringify(info))
    if (info.action === '1') {// 1 = new task
      list.innerHTML += info.information
      checkIfNoMoreTodo()
      progressthing()
    } else if (info.action === '2') {// 2 = task done
      checked(info.information)
    } else if (info.action === '3') {// 2 = turn task from done to not done
      check(info.information)
    }
  }
});