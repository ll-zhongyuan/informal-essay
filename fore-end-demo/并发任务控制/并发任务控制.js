
function timeout(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

// 创建一个构造函数
class SuperTask {
    constructor(parallelCount = 3) {
        this.parallelCount = parallelCount   // 并发任务量
        this.runningCount = 0  // 正在运行的任务数
        this.tasks = []  // 任务列表
    }

    // 函数内方法
    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject
            })
            this._run()
        })
    }

    // 辅助函数，依次运行tasks队列的所有任务
    _run() {
        while (this.runningCount < this.parallelCount && this.tasks.length) {
            const { task, resolve, reject } = this.tasks.shift()
            this.runningCount++
            task().then(resolve, reject).finally(() => {
                this.runningCount--
                // 递归调用辅助方法
                this._run()
            })
        }
    }
}

const superTask = new SuperTask()

function addTask(time, name) {
    superTask
        .add(() => timeout(time))
        .then(() => {
            console.log(`任务${name}完成`);
        })
}

addTask(10000, "一")    // 10000ms 后输出：任务一完成
addTask(5000, "二")     // 5000ms 后输出：任务二完成
addTask(2000, "三")     // 2000ms 后输出：任务三完成
addTask(3000, "四")     // 5000ms 后输出：任务四完成
addTask(8000, "五")     // 13000ms 后输出：任务五完成
addTask(6000, "六")     // 11000ms 后输出：任务六完成
addTask(4000, "七")     // 14000ms 后输出：任务七完成
