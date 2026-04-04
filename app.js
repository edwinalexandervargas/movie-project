// API key: https://www.omdbapi.com/?i=tt3896198&apikey=72de7e1b&

// http://www.omdbapi.com/?apikey=72de7e1b&
// 72de7e1b

let movies;

async function renderMovies(searchTerm) {
  const moviesWrapper = document.querySelector(".movies");
  const loadingWrapper = document.querySelector(".movies__loading");

loadingWrapper.classList.add("movies__loading--visible");
  if (!movies) {
    movies = await searchMovies(searchTerm);
  }

loadingWrapper.classList.remove("movies__loading--visible");

  const moviesHTML = movies
    .map((movie) => {
      return `<div class="movie">
                <figure class="movie__img--wrapper">
                    <img class="movie__img" src="${movie.Poster}" alt="${movie.Title}" />
                </figure>
                <div class="movie__title">
                    ${movie.Title}
                </div>
                <div class="movie__year">
                    ${movie.Year}
                </div>
            </div>`;
    })
    .join("");

  moviesWrapper.innerHTML = moviesHTML;
}

async function searchMovies(movies) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=72de7e1b&s=${movies}`,
  );
  const data = await response.json();
  return data.Search;
}

renderMovies("jujutsu")
