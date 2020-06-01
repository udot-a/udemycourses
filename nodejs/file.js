const fs = require("fs");

fs.writeFile("user-data.txt", "userData = global performance", err => {
    if (err) {
        console.log(err)
    } else {
        console.log("file is wrote...")
    }
});

fs.readFile("user-data.txt", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data.toString())
});