
let arr = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 },
    { id: 6, name: "部门6", pid: 2 },
    { id: 7, name: "部门7", pid: 10 },
    { id: 8, name: "部门8", pid: 11 },
]

// 方法一

// function flatToTree(arr) {
//   let cArr = JSON.parse(JSON.stringify(arr))
//   let result = []
//       all = {}
//       exc = []
//       betweenMap = {}
//   cArr.forEach(el => {
//     all[el.id] = el
//     betweenMap[el.pid] = betweenMap[el.pid] || []
//     betweenMap[el.pid].push(el)
//   })
//   for (let attr in all) {
//     const { id, pid } = all[attr]
//     if (betweenMap[pid] && all[pid]) {
//       all[pid].children = betweenMap[pid]
//       exc.push(id)
//     }
//   }
//   exc.forEach(el => Reflect.deleteProperty(all, el))
//   return Object.values(all)
// }
// const tree = flatToTree(arr)
// console.log(tree, arr);

// let box = document.getElementById('box')
// box.innerHTML(tree)



// 方法二

// let tree = arr.reduce((total, item, index, list) => total.concat({ ...item, children: list.filter((f) => f.pid == item.id), }), []); 
// console.log(tree);

// 缺点：时间复杂度更高，数据量大时不适用



// 方法三
// 双层循环遍历处理
// 把数据转成Map存储，之后遍历的同时借助对象的引用，从Map找对应的数据做存储
// function arrayToTree(items) {
//     const result = [];   // 存放结果集
//     const itemMap = {};  // 

//     // 先转成map存储
//     for (const item of items) {
//         itemMap[item.id] = { ...item, children: [] }
//     }

//     for (const item of items) {
//         const id = item.id;
//         const pid = item.pid;
//         const treeItem = itemMap[id];
//         // 判断
//         if (pid === 0) {
//             result.push(treeItem);
//         } else {
//             if (!itemMap[pid]) {
//                 itemMap[pid] = {
//                     children: [],
//                 }
//             }
//             itemMap[pid].children.push(treeItem)
//         }

//     }
//     return result;
// }
// console.log(arrayToTree(arr));


// 方法四

function arrToTree(array) {
    let data = {}
    const result = []
    array.forEach(item => {
        data[item.id] = item
    });
    array.forEach(item => {
        if (data[item.pid]) {
            if (data[item.pid].children) {
                data[item.pid].children.push(item)
            } else {
                data[item.pid].children = [item]
            }
        } else {
            result.push(item)
        }
    })
    return result
}
console.log(arrToTree(arr));
