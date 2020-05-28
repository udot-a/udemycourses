const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

function getCookie(cookies) {
    return cookies.split(";")
        .map( item => {
            const keyVal = item.trim().split("=");

            return Object.assign({}, { [keyVal[0]]: keyVal[1] });
        });
}

const getCookieNew = cookies => cookies.split("; ")
    .map( item => Object.assign(
        {},
        (arr => ({ [arr[0]]: arr[1] }))(item.split("="))
    ));


storeBtn.addEventListener('click', () => {
    const userId = "u123";
    const user = {
        name: "Dron",
        age: 42,
        city: "Kharkiv"
    }
    document.cookie = `uid=${userId}`;
    document.cookie = `user=${JSON.stringify(user)}`;

});

retrBtn.addEventListener('click', () => {
    console.log(getCookieNew(document.cookie));
});

