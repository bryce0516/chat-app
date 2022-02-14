const time = new Date().getTime()
const generateMessage = (text) => {
    return {
        text,
        createdAt:time
    }
}

const generateLocationMessage = (url) => {
    return {
        url,
        createdAt:time
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}