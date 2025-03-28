console.log('Start log')

const getUrl = new URL(window.location.href);
const getUrlParam = `${getUrl.searchParams.get('imdbID')}`

fetch(`http://www.omdbapi.com/?apikey=adc90226&i=` + getUrlParam + "&plot=full")
    .then(response => response.json())
    .then(data => {
        displayMovieData(data)
    })  
    .catch(error => {
        console.error('Could not fetch data:', error);
    })

console.log('display parameters start')

export function displayMovieData(movieData) {
    console.log(movieData)
// Wrapper
    const movieContainer = document.getElementById('movieInformation')
    const posterContainer = document.getElementById('posterWrapper')
    posterContainer.classList.add('poster-wrapper')
// Title
    const title = document.createElement("h2");
    title.classList.add("movie-title-big")
    title.textContent = `${movieData.Title} (${movieData.Year})`;
// Poster
    const poster = document.createElement("img");
    poster.src = movieData.Poster;
    poster.alt = `${movieData.Title} poster`;
    poster.classList.add("movie-poster-big"); 
// Plot
    const plot = document.createElement("p");
    plot.classList.add("movie-plot");
    plot.textContent = `${movieData.Plot}`;
// Genre
    const genre = document.createElement("h4");
    genre.classList.add("movie-genre");
    genre.textContent = `${movieData.Genre}`;
// Rated
    const rated = document.createElement("h3");
    rated.classList.add("movie-rated");
    rated.textContent = `Rated: ${movieData.Rated}`;
// Actors
    const actors = document.createElement("h5");
    actors.classList.add("movie-actors");
    actors.textContent = `Actors: ${movieData.Actors}`;

    posterContainer.appendChild(poster)
    
    movieContainer.appendChild(title)
    movieContainer.appendChild(rated)
    movieContainer.appendChild(genre)
    movieContainer.appendChild(plot)
    movieContainer.appendChild(actors)
} 