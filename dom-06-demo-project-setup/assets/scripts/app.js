const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");


const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display="block";
    } else {
        entryTextSection.style.display="none";
    }
}

const toggleBackdrop = () => backdrop.classList.toggle("visible");

const clearMovieInput = arr => arr.forEach(item => item.value = "");

const deleteMovie = (elem) => () => {
    deleteMovieModal.classList.add("visible");

    toggleBackdrop();

    cancel.onclick = e => {
        deleteMovieModal.classList.remove("visible");
        toggleBackdrop();
    }

    yes.onclick = e => {
        deleteMovieModal.classList.remove("visible");
        toggleBackdrop();
        elem.remove();
    }
};

const renderNewMovieElement = (title, image, rating) => {
    const newMovieElement = document.createElement("li");

    newMovieElement.className = "movie-element";

    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${image}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;

    newMovieElement.addEventListener("click", deleteMovie(newMovieElement) ) ;

    document.getElementById("movie-list").appendChild(newMovieElement);

}

startAddMovieButton.onclick = (e) => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
}

backdrop.onclick = e => {

    toggleBackdrop();
    addMovieModal.classList.remove("visible");
    deleteMovieModal.classList.remove("visible");
    clearMovieInput(userInputs);
}

cancelAddMovieButton.onclick = e => {
    toggleBackdrop();
    addMovieModal.classList.remove("visible");
    clearMovieInput(userInputs);
}

confirmAddMovieButton.onclick = e => {
    const title = userInputs[0].value.trim();
    const image = userInputs[1].value.trim();
    const rating = isNaN(Number(userInputs[2].value))
        ||  userInputs[2].value <= 0
        || userInputs[2].value > 5
        ? -1
        : Number(userInputs[2].value);
    if (!title || ! image || rating < 0) {
        alert("Invalid type in user input!!!");
    }

    const newMovie = {
        title,
        image,
        rating
    }

    movies.push(newMovie);

    console.log(movies);
    toggleBackdrop();
    addMovieModal.classList.remove("visible");

    clearMovieInput(userInputs);
    renderNewMovieElement(title, image, rating);
    updateUI();
}
