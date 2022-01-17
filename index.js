let moovieData = [];

async function fetchMoovie() {
  await fetch("https://api.themoviedb.org/3/search/movie?api_key=7b2355d87ecc04dc9bd26b6254ac0133&query=star&language=fr-FR")
    .then((res) => res.json())
    .then((data) => (moovieData = data.results));

  console.log(moovieData);
  countriesDisplay();
}

function countriesDisplay() {
  cardContainer.innerHTML = moovieData
    // .filter((country) => country.population > 60000000)
    // .sort((a, b) => b.population - a.population)
    .slice(0, 30)
    .map(
      (moovie) => `
          <div class="card">
            <h2>${moovie.title}</h2>
            <p>Date de sortie : ${moovie.release_date}</p>
            <p>${moovie.overview}</p>
            <p>Note moyenne : ${moovie.vote_average} ${moovie.vote_average>6.5 ? "🔥" : "❄-"}</p>
          </div>
        `
    )
    .join("");
}

window.addEventListener("load", fetchMoovie);