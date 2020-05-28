btn.addEventListener("click", function (e)
{
    // e.stopPropagation();
    console.log("Buttob click: ", e);
    console.log("THIS: ", this)
});

// setTimeout(() => btn.removeEventListener("click", handleClick), 2000);


block.addEventListener("click", e => console.log("DIV CLICK: ", e));

const listItems = document.querySelectorAll("li");

// listItems.forEach(item => item .onclick = ({ target: { classList } }) => classList.toggle("highlight"))

const list = document.querySelector("ul");

list.addEventListener("click" , ({ target}) => {
        target.closest("li")
        && target.closest("li").classList.toggle("highlight");

        btn.click();
}
);

