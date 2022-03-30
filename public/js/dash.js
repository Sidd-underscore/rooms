


function saveName() {
  var name = document.getElementById('name-input').value
  localStorage.setItem('person', name)
}

function saveColor() {
  var color = document.getElementById('color').value
  localStorage.setItem('color', color)
  alert('Done! ')

}

function avatar() {
  const apikey = 'AUvtAL5uKQduVuTrGbDapz';
  const client = filestack.init(apikey);
  const options = {
    fromSources: ["local_file_system", "imagesearch", "url", "unsplash", "webcam"],
    accept: ["image/*"],


    maxFiles: 1,
    uploadInBackground: false,
    onOpen: () => console.log('opened!'),
    onUploadDone: (res) => saveAvatar(res),
    //onUploadDone: (res) => console.log(res),
  };
  client.picker(options).open();


}

function saveAvatar(res) {

  var url = res.filesUploaded.map(({
    url
  }) => url);
  var xhttp = new XMLHttpRequest();
  xhttp.open('HEAD', url);
  xhttp.onreadystatechange = function() {
    if (this.readyState == this.DONE) {
      localStorage.setItem('avatar', res.filesUploaded.map(({ url }) => url))
      alert('Reloading to save changes!')
      window.location.reload()
    }
  };
  xhttp.send();

}

function saveNotif() {
  var thin = document.getElementById("notif").checked
  if (thin) {
    localStorage.setItem('notifs', "yes");
  } else {
    localStorage.setItem('notifs', "no")
  }
  alert('Done! ')
}

function clearData() {
  vex.dialog.confirm({
      message: 'Are you sure???!!!',
      input: [
        'You are about to clear <strong>all</strong> your data. This includes your name, color, chats, notification settings, etc. Continue?'
      ].join(''),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: 'No!!!' }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'Yes' })
      ],
      callback: function(data) {
        if (data === true) {

return
        } else if (data === false) {

  localStorage.clear()
  alert("Cleared data. Reloading")
  location.reload();        }

      }
    })


}


var person = localStorage.getItem('person');
var avatarsource = localStorage.getItem('avatar');
var notif_thin = localStorage.getItem('notifs');
var color = localStorage.getItem('color');
var discord_name = localStorage.getItem('discord-name');
var discord_id = localStorage.getItem('discord-id');
var discord_avatar = localStorage.getItem('discord-avatar');
var discord_discriminator = localStorage.getItem('discord-discriminator');
const no = "<i>Not Connected</i>"
document.getElementById('avatar-preview').src = avatarsource
document.querySelector('.name').textContent = person
document.querySelector('#name-input').value = person
if (notif_thin === 'yes') {
  document.getElementById('notif').checked = true;
}
document.getElementById('color').value = color

function load() {
  if (!avatarsource) {
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
    console.log(color)
    window.reload()

  }

}