const obj = {
    a: 1,
    b: 2,
    c: {
        a: 1,
        b: 2
    }
}

// vue2  defineProperty 主要使用深度遍历的方式监听每一个属性，在观察之后新增、删除对象并不会被监听到
function _isObject(v) {
    return typeof v === 'object' && v != null
}
function observe(obj) {
    for (const k in obj) {
        let v = obj[k]
        if (_isObject(v)) {
            observe(v)
        }
        Object.defineProperty(obj, 'a', {
            get() {
                console.log('a', '读取');
                return v
            },
            set(val) {
                if (val !== v) {
                    console.log('a', '更改');
                    v = val
                }
            }
        })
    }
}

// 观察

observe(obj)
obj.a


// -------------------------------------------------------------
// vue3 proxy 不对属性进行监听，而是直接监听整个对象，也就不需要遍历对象

const proxy = new Proxy( obj , {
    get(target, k) {
        let v = target[k]
        console.log(k, '读取');
        return v
    },
    set(target, k, val) {
        if (target[k] !== val) {
            target[k] = val
            console.log(k, '更改');
        }
    }
})
// 观察
proxy.a = 5
proxy.b