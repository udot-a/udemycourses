const course = {
    title: "JavaScript. The complete guide"
}

Reflect.setPrototypeOf(course, {
    toString() {
        return this.title
    }
})
Reflect.
console.log(course + "")