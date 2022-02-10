const socket = io()


// socket.on('countUpdated', (count) => {

//     console.log("The count has been updated!", count)
// })

socket.on('message', (message) => {
    console.log("this is message", message)
})

document.querySelector("#message-form").addEventListener('submit', (event) => {
    event.preventDefault();

    const message = event.target.elements.message.value
    socket.emit('sendMessage', message)
})


document.querySelector("#send-location").addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log("this is browser ", position)
        socket.emit('sendLocation' ,{
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
    })
})
// document.querySelector("#increment").addEventListener('click', ()=> {
//     console.log("Clicked")
//     socket.emit('increment')
// })