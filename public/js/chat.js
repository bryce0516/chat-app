const socket = io()


// socket.on('countUpdated', (count) => {

//     console.log("The count has been updated!", count)
// })

socket.on('message', (message) => {
    console.log("this is message", message)
})

document.querySelector("#message-form").addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('input').value
    socket.emit('sendMessage', message)
})

// document.querySelector("#increment").addEventListener('click', ()=> {
//     console.log("Clicked")
//     socket.emit('increment')
// })