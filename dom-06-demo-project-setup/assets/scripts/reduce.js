const reduceArr = (str) =>
    str.split("").reduce((obj, item) =>
            Object.assign(obj, {[item]: obj[item] ? ++obj[item] : 1}), {});

console.log(reduceArr("aasddddfdfgdfg"));