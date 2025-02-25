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

// Genererar top 20 listan och trycker ut på index. Låter slumpningen vänta tills jag är färdig med grundfunktionaliteten
function getTopList(movies) {

    const topMovies = movies.slice(0, 20);
    const cardContainer = document.getElementById("cardContainer");

    topMovies.forEach((movie, index) => {
// Card element 
        const card = document.createElement("article");
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

        card.appendChild(poster);
        card.appendChild(title);
        cardContainer.appendChild(card);

    });
}
getMovieList()

// Slut top 20 

// Hämtar OMDB's api
// Nyckelring: imdbID
// Nyckelring: http://www.omdbapi.com/?apikey=[yourkey]&s=[söksträng]          - Bred sökning
// Nyckelring: http://www.omdbapi.com/?apikey=[yourkey]&plot=full&i=[imdb-ID]  - Specifik sökning
    // const broadSearchAPI = "http://www.omdbapi.com/?apikey=adc90226&"; // Glöm inte att lägga till submitten
    // const searchInput = document.getElementById('searchInput');
    // const searchBtn = document.getElementById('searchBtn');
    const broadSearchResults = // Skicka till Search och använd cards
console.log('broadSearch start')
async function fetchBroadSearch(query) {

    const broadSearchAPI = "http://www.omdbapi.com/?apikey=adc90226&"; // Glöm inte att lägga till submitten
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    // const broadSearchResults = document // Skicka till Search och använd cards

    try  {
        const response = await fetch(`${broadSearchAPI}&s=${query}`);
        const data = await response.json();
1
        if (data.response === "True") {
            displayBroadSearch(data);
        } else {
            broadSearchResults.innerHTML = '<li>Not found</li>';
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
    broadSearchResults.innerHTML = '' // Rensa innerhtml
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