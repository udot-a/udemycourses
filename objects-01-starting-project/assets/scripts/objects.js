const movies = [];

const addMovieHandler = () => {
    const newMovie = {
        info: {
            title: title.value || "DEFAULT",
            [extraName.value]: extraValue.value
        },
        id: String(Math.random())
    }
    movies.push(newMovie);
    console.log(movies);
    renderMovies();
}

const searchMovieHandler = () => {
    renderMovies(movies.filter(({ info: {title } }) => filterTitle.value === title));
}

const renderMovies = (arr = movies) => {
    arr.length === 0
        ? movieList.classList.remove("visible")
        : movieList.classList.add("visible");

    movieList.innerHTML = "";

    arr.forEach(({ info: { title,  ...other} }) => {
       const liElem = movieList.appendChild(document.createElement("li"));
       liElem.textContent = `${title} - ${Object.keys(other)[0]} ${Object.values(other)[0]}`;
    });
}

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);



