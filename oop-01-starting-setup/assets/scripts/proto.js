function getChainProto(obj) {
    console.dir(obj)

    if (obj.__proto__) {
        return getChainProto(obj.__proto__);
    }
}
let obj = {
    a: 4,
    b: 5
}

let obj2 = {
    c: 6,
    d: 7
}

let count = 0;

obj2.__proto__ = obj;
const arr = [1, 2, 3, 4, 5]
getChainProto(arr);

