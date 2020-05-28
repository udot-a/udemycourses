const randomRange = (min, max) => {
    if (max - min <0) {
        return "Incorrect range"
    }
    return Math.floor(Math.random() * (max - min+1) +min);
}

console.log(randomRange(10,100));

