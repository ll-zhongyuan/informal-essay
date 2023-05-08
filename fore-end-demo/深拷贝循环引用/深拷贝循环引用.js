function deepClone(obj) {
    return new Promise((resolve) => {
        const { port1, port2 } = new MessageChannel()
        port1.postMessage(obj)
        port2.onmessage = (msg) => {
            resolve(msg.data)
        }
    })
}
var obj = { a: 1, b: 2 }
obj.c = obj
deepClone(obj).then(o => console.log(o))