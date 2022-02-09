


const socket = io()
console.log("its working",socket)
socket.on('countUpdated', () => {
    console.log("The count has been updated!")
})
