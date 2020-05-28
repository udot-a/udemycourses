const listElement = document.querySelector(".posts");

function sendHttpRequest(method, url, data) {
    // const promise = new Promise((resolve, reject) => {
        // const xhr = new XMLHttpRequest();
        //
        // xhr.open(method, url);
        //
        // xhr.responseType = "json";
        //
        // xhr.onload = () => {
        //     if (xhr.status >=200 && xhr.status < 300) {
        //         resolve(xhr.response)
        //     } else {
        //         reject(new Error("Something wrong with network..."))
        //     }
        // }
        //
        // xhr.onerror = () => {
        //     const {status, response} = xhr;
        //     console.warn("Status: ", status, ",\n Response: ", response);
        // }
        //
        // xhr.send(JSON.stringify(data));

    // });

    // return promise;

    return fetch(url, {
        method,
        body: data, //JSON.stringify(data),
        // headers: {
        //     "Content-Type": "application/json"
        // }
    })
        .then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                return resp.json();
            } else {
                throw new Error("Something wrong in fetch...");
            }
        })
}

const fetchPosts = async () => {
    listElement.innerHTML = "";

    try{
        const {data} = await axios("https://jsonplaceholder.typicode.com/posts")
        console.log(data)

        data.forEach(({ title, body, id }) => {
            const postEl = document.importNode(singlePost.content, true);
            postEl.querySelector("li").id = id;
            postEl.querySelector("h2").textContent = title.toUpperCase();
            postEl.querySelector("p").textContent = body;

            listElement.append(postEl);
        })
    } catch(error) {
        console.warn(error)
    }




}

const createPost = async (title, body) => {
    const post = {
        title,
        body,
        userId: Math.random()
    }

    const fd = new FormData(formData);
    fd.append("userId", Math.random);

    await axios.post("https://jsonplaceholder.typicode.com/posts", fd)
    await fetchPosts();
}

fetchBtn.onclick = () => fetchPosts();

addBtn.onclick = e => {
    e.preventDefault();
    createPost(title.value, content.value);
}

listElement.onclick = e => {
    if (e.target.tagName === "BUTTON") {
        const postId = e.target.closest("li").id;
        sendHttpRequest("DELETE", `https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
}




