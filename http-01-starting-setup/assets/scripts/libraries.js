const _ = require("lodash");
const customers = ["Max", "Dron", "Semen", "Arkadii", "Ivan", "Mark", "Nikita", "Evlampy"];

const activeCustomers = ["Max", "Evlampy"];

const inactive = customers.filter(items => !activeCustomers.some(i => i === items) )

console.log(inactive)

const lodashArr = _.difference(customers, activeCustomers)

console.log(lodashArr)