// Hämtar Jespers api
async function getMovieList() {
    const santosAPI = "https://santosnr6.github.io/Data/favoritemovies.json";
    try  {
        const response = await fetch(santosAPI);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`)
        }
    
    const movies = await response.json();
    getTopList(movies);
    } catch (error) {
        console.log("Error fetching movies", error.message);
    }
}
// Slut på inhämtning

// Genererar top 20 listan och trycker ut på index. Låter slumpningen vänta tills jag är färdig med grundfunktionaliteten
function getTopList(movies) {
    const topMovies = movies.slice(0, 20);

    const cardContainer = document.getElementById("cardContainer");

    topMovies.forEach((movie, index) => {
// Card element 
        const card = document.createElement("span");
        card.classList.add("movie-card");
// Titel element
        const title = document.createElement("h3");
        title.textContent = `${movie.Title}`;
// Poster element
        const poster = document.createElement("img");
        poster.src = movie.Poster;
        poster.alt = `${movie.title} poster`;
        poster.classList.add("movie-poster");

        card.appendChild(title);
        card.appendChild(poster);

        cardContainer.appendChild(card);

    });
}
// Slut top 20 

// getMovieList()

// Hämtar OMDB's api

// Nyckelring: http://www.omdbapi.com/?apikey=[yourkey]&s=[söksträng]          - Bred sökning
// Nyckelring: http://www.omdbapi.com/?apikey=[yourkey]&plot=full&i=[imdb-ID]  - Specifik sökning
    const broadSearchAPI = "http://www.omdbapi.com/?apikey=adc90226&"; // Glöm inte att lägga till submitten
        console.log(broadSearchAPI)
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const broadSearchResults = document.getElementById('cardContainer') // Skicka till Search och använd cards

async function fetchBroadSearch(query) {
    try  {
        const response = await fetch(`${broadSearchAPI}&s=${query}`);
        const data = await response.json();

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
// Slut på OMDB inhämtning

// Visa sökresultat för bred sökning
function displayBroadSearch(data) {
    broadSearchResults.innerHTML = '' // Rensa innerhtml

    data.search.forEach(result => {
        const broadList = document.createElement('span');
        broadList.classList.add('card');
        broadList.innerHTML= `
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