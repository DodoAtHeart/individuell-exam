import { renderTrailers } from "./caroussel.js";

console.log('api start')
// Hämtar Jespers api
export async function getMovieList() {
    const santosAPI = "https://santosnr6.github.io/Data/favoritemovies.json";
    try  {
        const response = await fetch(santosAPI);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`)
        }
    
    const movies = await response.json();
    getTopList(movies);
    getRandomTrailers(movies);

    } catch (error) {
        console.log("Error fetching movies", error.message);
    }
}
// Slut på inhämtning

// Generera 5 random trailers
function getRandomTrailers(movies) {
    for (let i = movies.length - 1; i > 0; i--) {    // Här är vår randomizer //
        let j = Math.floor(Math.random() * (i + 1));
        [movies[i], movies[j]] = [movies[j], movies[i]];
    }
    const topTrailers = movies.slice(0, 5);
    topTrailers.forEach((movie, index) => {
// Render trailer
        renderTrailers(movie, index)
    });
}
// Slut Generera 5 random trailers

// Add favorite

// gör ett toggle event, om värdet är true skicka det till localstore favs[]
// om det är false, ta bort från localstorage favs[]
// hitta en stjärnikon som är tom och en full för det visuella

// End add favorite

// Genererar top 20 listan och trycker ut på index. Låter slumpningen vänta tills jag är färdig med grundfunktionaliteten
function getTopList(movies) {

    const topMovies = movies.slice(0, 20);
    const cardContainer = document.getElementById("cardContainer");

    topMovies.forEach((movie, index) => {
// Card element 
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.setAttribute('data-id', movie.imdbID);
        card.addEventListener("click", function() {
            window.location.href = "movie.html?imdbID=" + movie.imdbID                 
        })   

// Titel element
        const title = document.createElement("h3");
        title.classList.add("movie-title")
        title.textContent = `${movie.Title}`;
// Poster element
        const poster = document.createElement("img");
        poster.src = movie.Poster;
        poster.alt = `${movie.Title} poster`;
        poster.classList.add("movie-poster");
// Add to favorites element
        const favoriteBtn = document.createElement("button");
        favoriteBtn.textContent = "Add to Favorites";
        favoriteBtn.classList.add("favorite-btn");
        favoriteBtn.addEventListener("click", function(event) {
            event.stopPropagation(); // Stoppar card.click
            addToFavorites(movie); 
});

        card.appendChild(poster);
        card.appendChild(title);
        card.appendChild(favoriteBtn);
        cardContainer.appendChild(card);
    });
}
getMovieList()

// Slut top 20 

function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.response(data.imdbID)) {
        favorites.setAttribute('favorite-id', movie.imdbID);
        favorites.push(movie.imdbID);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        displayFavorites();

    } else { 
        alert("This is already a favorite")
    }
}

function displayFavorites() {
    const favoritesList = JSON.parse(localStorage.getItem("favoriteMovieList"));
    favoritesList.innerHTML = '';

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach((movie) => {
        const list = document.createElement('li');
        list.textContent = movie.Title;
        favoritesList.appendChild(list);
    })
}

// Hämtar OMDB's api
// Nyckelring: imdbID
// Nyckelring: http://www.omdbapi.com/?apikey=[yourkey]&s=[söksträng]          - Bred sökning
// Nyckelring: http://www.omdbapi.com/?apikey=[yourkey]&plot=full&i=[imdb-ID]  - Specifik sökning
    // const broadSearchAPI = "http://www.omdbapi.com/?apikey=adc90226&"; // Glöm inte att lägga till submitten
    // const searchInput = document.getElementById('searchInput');
    // const searchBtn = document.getElementById('searchBtn');
    // Skicka till Search och använd cards
console.log('broadSearch start')
async function fetchBroadSearch(query) {

    const broadSearchAPI = "http://www.omdbapi.com/?apikey=adc90226&"; // Glöm inte att lägga till submitten
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    

    try  {
        const query = document.getElementById('searchInput').innerText
        const response = await fetch(`${broadSearchAPI}&s=${query}`);
        const data = await response.json();
1
        if (data.response === "True") {
            displayBroadSearch();
        } else {
            console.error('list not found');
        }
    } catch (error) {
        console.error('Could not fetch data:', error);
        broadSearchResults.innerHTML = '<li>Something went whoopsiedaysies?! Try again</li>';
    }
}
console.log('broadSearch end')
// Slut på OMDB inhämtning

// Visa sökresultat för bred sökning
function displayBroadSearch(data) {
    // broadSearchResults.innerHTML = '' // Rensa innerhtml
    const broadSearchContainer = document.getElementById('searchContainer');

    data.search.forEach(result => {
        broadSearchContainer.classList.add('card');
        broadSearchContainer.innerHTML= `
            <h3>${result.Title}</h3>
            <img src="${result.Poster}" alt="${result.Title}" />
        `;
        broadSearchResults.appendChild(broadList);
    })

}
// Slut Visa sökresultat för bred sökning

// Eventlyssnare för sökknappen och enterknapp

searchBtn.addEventListener('click', () => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetchBroadSearch(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

console.log('api end')