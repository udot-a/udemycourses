const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

let db;


const dbRequest = indexedDB.open("DronDB", 1);


dbRequest.onsuccess = ({ target: {result} }) => {
    db = result;
}


dbRequest.onupgradeneeded = ({ target: {result} }) => {
    db = result;
    const objStore = db.createObjectStore("products", {keyPath: "id"});

    objStore.transaction.oncomplete = e => {
        const productStore = db.transaction("products", "readwrite").objectStore("products");

        productStore.add({
            id: "p1",
            title: "iphone X",
            price: 500,
            tags: ["expansive", "luxury"]
        })
    }
}

dbRequest.onerror = ({ target: {result} }) => {
    console.warn("Error in DB!!!")
}

storeBtn.addEventListener('click', () => {
    if (!db) {
        return
    }

    const productStore = db.transaction("products", "readwrite").objectStore("products");

    productStore.add({
        id: "p2",
        title: "iphone XR",
        price: 600,
        tags: ["expansive", "luxury"]
    })
});

retrBtn.addEventListener('click', () => {
    const productStore = db.transaction("products", "readwrite").objectStore("products");

    const request = productStore.get("p2");

    request.onsuccess = () =>
        console.log(request.result);
});

