let movieData = [];
const buttons = document.querySelectorAll("button");
let genderId = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

async function fetchMovie(search) {
  await fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=7b2355d87ecc04dc9bd26b6254ac0133&query=" +
      search +
      "&language=fr-FR"
  )
    .then((res) => res.json())
    .then((data) => (movieData = data.results));

  console.log(movieData);
  movieDisplay();
}

function movieDisplay(sort) {
  cardContainer.innerHTML = movieData
    .slice(0, 30)
    .sort((a, b) => {
      if (sort === "lower2Better") {
        return a.vote_average - b.vote_average;
      } else if (sort === "better2Lower") {
        return b.vote_average - a.vote_average;
      }
    })
    .map(
      (movie) => 
        `
        <div class="card">
        <p>Details movie</p>
        <img src="${
          movie.poster_path == null
          ? "./assets/img/generic-poster.png"
          : "https://image.tmdb.org/t/p/w500" + movie.poster_path
        }" class="moviePic" alt="Movie Poster" width="80%">
        <h2>${movie.title}</h2>
        <span class="note">Note moyenne : ${movie.vote_average} ⭐</span>
        <span></span>
        <p calss="synopsis" >${movie.overview}</p>
        </div>
        `

    )
    .join("");
    
}

window.addEventListener("load", fetchMovie);
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    movieDisplay(e.target.id);
  });
});
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetchMovie(searchInput.value);
});
