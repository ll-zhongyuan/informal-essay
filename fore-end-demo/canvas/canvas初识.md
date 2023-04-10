之前的博客中有个很有意思的画面，如下图

![博客图片](http://ox.zhongyuan.space/hexo/articleIllustrations/canvas/0.jpg)

之前是用组件实现的，并没有深入研究，最近也没什么事情，上手操作一下。

[canvas mdn中文文档](https://developer.mozilla.org/zh-CN/docs/Glossary/API)

英文能力够好的话，建议去看英文文档，毕竟原文档是写的最准确的。中文版难免会出现版本滞后或者是翻译错误的情况。但是不管怎么样，肯定是比平时看的博客专业度什么的要高得多，毕竟别人的东西不一定符合你的业务需求。官方文档才是最准确的知识！

[mdn 英文文档](https://developer.mozilla.org/en-US/docs/Glossary/API)

要实现canvas 基本绘图

首先要获取绘制上下文

` const cvs = document.querySelector('canvas')`

`const ctx = cvs.getContext('2d')`

所有的绘图都必须在上下文中完成

同一个canvas 只能产生唯一的上下文

上下文类型可以是 2d 、 bitmaprenderer 、webgl 、 webgl2、

一般来说要先初始化设置canvas的宽高

`cvs.width = window.innerWidth - 50`

`cvs.height = window.innerHeight - 50`

这里设置后页面呈现出一个矩形canvas区域

canvas常用的api方法，个人理解，部分理解不一致，详情请参考官方文档 [mdn 英文文档](https://developer.mozilla.org/en-US/docs/Glossary/API)

- 画直线 ：lineTo
- 画弧线 ：arc
- 清空路径 ： beginPath
- 关闭路径 ： closePath
- 填充 ： fill
- 描边 ： stroke

根据需求自由组合，这里我们需要生成几个点并连接生成基础图形

写一个获取随机数的函数，这里最大数和最小数按需求来写

```
function getRandom(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min)
    }
```

封装canvas函数

```
class Point {
        constructor() {
            this.r = 6   //设置弧形半径
            this.x = getRandom(0, cvs.width - this.r / 2)  //设置横坐标
            this.y = getRandom(0, cvs.height - this.r / 2) //设置纵坐标
        }
        draw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)  // 绘制圆弧路径
            ctx.fillStyle = '#fff'// 设置填充样式
            ctx.fill()
        }
    }
```

封装图形构造函数

```
 class Graph {
        constructor(pointNumber = 30, maxDis = 300) {  //设置生成数量和最大直线距离
            this.points = new Array(pointNumber).fill(0).map(() => new Point())
            this.maxDis = maxDis
        }
        draw() {
            for (let i = 0; i < this.points.length; i++) {
                const p1 = this.points[i]
                p1.draw()
                for (let j = i + 1; j < this.points.length; j++) {
                    const p2 = this.points[j]
                    const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)  //开根号赋值两点之间的直线距离
                    if (d > this.maxDis) {  //判断两点之间直线距离是否超过设置值
                        continue
                    }
                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                    ctx.closePath()
                    ctx.strokeStyle = `rgba(200,200,200,${1 - d / this.maxDis})`
                    ctx.stroke()
                }
            }
        }
    }
    const g = new Graph()
    g.draw()
```

这里有了静态canvas图形，然后加上部分动画效果

```
this.xSpeed = getRandom(-50, 50)    // 设置横向速度(随机)
this.ySpeed = getRandom(-50, 50)    // 设置纵向速度(随机)
this.lastDrawTime = null    // 记录上次作画的时间
```

```
 // 更新坐标
            if (this.lastDrawTime) {
                // 计算新的坐标
                const duration = (Date.now() - this.lastDrawTime) / 1000
                // 获取坐标距离
                const xDis = this.xSpeed * duration
                const yDis = this.ySpeed * duration

                // 计算新的横纵坐标
                let x = this.x + xDis
                let y = this.y + yDis
                if (x > cvs.width - this.r / 2) {
                    x = cvs.width - this.r / 2
                    this.xSpeed = - this.xSpeed
                }
                else if (x < 0) {
                    x = 0
                    this.xSpeed = - this.xSpeed
                }
                if (y > cvs.height - this.r / 2) {
                    y = cvs.height - this.r / 2
                    this.ySpeed = - this.ySpeed
                }
                else if (y < 0) {
                    y = 0
                    this.ySpeed = - this.ySpeed
                }
                this.x = x
                this.y = y
            }
```

`并记录作画时间  this.lastDrawTime = Date.now()  // 记录作画时间`

我们需要重复渲染很多次，每次渲染需要重新执行`deaw()`方法

```
requestAnimationFrame(() => {  // 每次渲染重新执行draw()方法
                this.draw()
            })
ctx.clearRect(0, 0, cvs.width, cvs.height)  // 清空画布
```

![最终结果图](http://ox.zhongyuan.space/hexo/articleIllustrations/canvas/1.jpg)