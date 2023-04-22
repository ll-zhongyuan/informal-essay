// 微任务，阻塞
function runTask(task) {
    return new Promise((resolve) => {
        Promise.resolve().then(() => {
            task()
            resolve()
        })
    })
}
// --------------------------------------

// 宏任务，卡顿
function runTask(task) {
    return new Promise((resolve) => {
        setTimeout(() => {
            task()
            resolve()
        }, 0);
    })
}
// --------------------------------------

// req 阻塞
function runTask(task) {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            task()
            resolve()
        });
    })
}
// --------------------------------------

// 创建辅助函数
// requestIdleCallback 不兼容性 Safari 浏览器
function _runTask(task, callback) {
    requestIdleCallback((idle) => {
        if (idle.timeRemaining() > 0) {
            task()
            resolve()
        } else {
            _runTask(task, callback)
        }
    })
}

function runTask(task) {
    return new Promise((resolve) => {
        _runTask(task, resolve)
    })
}

//--------------------------------------

// 最佳解决方案
function _runTask(task, callback) {
    let start = Date.now()
    requestAnimationFrame(() => {
        if (Date.now() - start < 16.6) {
            task()
            resolve()
        } else {
            _runTask(task, callback)
        }
    })
} 
function runTask(task) {
    return new Promise((resolve) => {
        _runTask(task, resolve)
    })
}