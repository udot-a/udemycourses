const http = require("http");

const server = http.createServer((req, resp) => {
    let body = []

    req.on("data", chunk => {
        body.push(chunk)
    });

    req.on("end", () => {
        body = Buffer.concat(body).toString();
        let userName = "Unknown user";

        if (body) {
            userName = body.split("=")[1];
        }

        resp.setHeader("Content-Type", "text/html")
        resp.write(`
        <form
            method="post"
            action="/"
        >
            <h1>Name: ${userName}</h1>
            <input name="username" type="text">
            <button type="submit">Send</button>
        </form>
    `);
        resp.end();

    })

});

server.listen(3000);


