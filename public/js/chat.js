const socket = io();

// socket.on('countUpdated', (count) => {

//     console.log("The count has been updated!", count)
// })

//Elements
const $messageForm = document.querySelector("#message-form");
const $messsageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

//templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;

//options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("message", (message) => {
  console.log("message from server => ", message);

  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("HH:mm:ss a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (response) => {
  console.log("locationMessage from server => ", response);
  const html = Mustache.render(locationMessageTemplate, {
    username: response.username,
    url: response.url,
    createdAt: moment(response.createdAt).format("HH:mm:ss a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = event.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messsageFormInput.value = "";
    $messsageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });

  // socket.emit('sendMessage', message, (messageFromServer) => {
  //     console.log("messgae was delivered!",messageFromServer)
  // })
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    console.log("this is browser ", position);
    socket.emit(
      "sendLocation",
      {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      },
      () => {
        $sendLocationButton.removeAttribute("disabled");
        console.log("Location shared!");
      }
    );
  });
});
// document.querySelector("#increment").addEventListener('click', ()=> {
//     console.log("Clicked")
//     socket.emit('increment')
// })

socket.emit("join", { username, room }, (error) => {
    if(error){
        alert(error)
        location.href ="/"
    }

});
