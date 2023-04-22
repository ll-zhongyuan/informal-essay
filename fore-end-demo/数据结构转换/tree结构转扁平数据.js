
const tree = [
    {
        id: 1,
        nick: '111',
        children: [{ id: 6, nick: '666' }],
    },
    {
        id: 2,
        nick: '222',
        children: [
            {
                id: 3,
                nick: '333',
                children: [
                    {
                        id: 4,
                        nick: '444',
                        children: [
                            {
                                id: 5,
                                nick: '555',
                                children: [
                                    { id: 8, nick: '888' },
                                    { id: 9, nick: '999' },
                                    { id: 10, nick: 'aaa' },
                                    { id: 11, nick: 'bbb' },
                                ],
                            },
                        ],
                    },
                    { id: 7, nick: '777' },
                ],
            },
        ],
    },
];

// 深度优先转化
const treeToListDepth = (tree) => {
    let result = [];

    tree.forEach((item) => {
        result.push(item); // 将该节点压进去

        // 若该节点有子节点，则优先执行子节点
        if (Array.isArray(item.children) && item.children.length) {
            result = result.concat(treeToListDepth(item.children));
        }
    });
    return result;
};

// 广度优先转化
const treeToListBreadth = (tree) => {
    let queue = tree; // 用一个队列来存储将要遍历的节点
    const result = [];

    while (queue.length) {
        const item = queue.shift();
        result.push(item);

        // 子节点存储到队列中，等待遍历
        if (Array.isArray(item.children) && item.children.length) {
            queue = queue.concat(item.children);
        }
    }
    return result;
};

console.log(treeToListDepth(tree), treeToListBreadth(tree));
