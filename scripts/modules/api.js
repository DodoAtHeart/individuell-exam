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

// Genererar topplistan
function getTopList(movies) {

    const topMovies = movies.slice(0, 10);
    const cardContainer = document.getElementById("cardContainer");
    
    topMovies.forEach((movie, index) => {
// Card element 
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.setAttribute('data-id', movie.imdbID);
        card.addEventListener("click", function() {
            window.location.href = "movie.html?imdbID=" + movie.imdbID                 
        })   

        // Title element
        const title = document.createElement("h3");
        title.classList.add("movie-title")
        title.textContent = movie.Title;

        // Add to favorites element
        const addToFavoritesIcon = document.createElement("button");
        addToFavoritesIcon.classList.add("favBtnToggle");
        addToFavoritesIcon.innerHTML = "+"

        // Poster element
        const poster = document.createElement("img");
        poster.src = movie.Poster;
        poster.onerror = "./res/icons/missing-poster.svg"
        poster.alt = `${movie.Title} poster`;
        poster.classList.add("movie-poster");


        // Display appended objects
        card.appendChild(poster);
        card.appendChild(title);
        cardContainer.appendChild(card);
        card.appendChild(addToFavoritesIcon)
    });
}
getMovieList()
// Slut toplista

// Add favorite

// gör ett toggle event på facBtnToggle, om värdet är is-favorite true, skicka till localstorage
// om det är false, ta bort från localstorage favs[]
function addToFavorites(event) {
    event.preventDefault();

    if (e.target.classList.contains('favBtnToggle')) {
        if (e.target.classList.contains('is-favorite')) {

            e.target.classList.remove('is-favorite');
        } else {
            // Class add
            e.target.classList.remove('is-favorite');
        }
    } 
    // When favBtnToggle is clicked
    if(e.target.classList.contains('favBtnToggle')) {
        console.log('pling')
    }
}


// function favToggle(imdbID) {

//     let myFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
//     const favIndex = myFavorites.indexOf(imdbID);

//     if (favIndex === -1) {
//         myFavorites.push(imdbID);
//         console.log(`${imdbID} added to favorites`);
//     } else {
//         myFavorites.splice(favIndex, 1);
//         console.log(`${imdbID} has been removed from favorites`)
//     }

//     localStorage.setItem('myFavorites', JSON.stringify(myFavorites));
// }

// function addToFavorites(movie) {
//     let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//     if (!favorites.response(data.imdbID)) {
//         favorites.setAttribute('favorite-id', movie.imdbID);
//         favorites.push(movie.imdbID);
//         localStorage.setItem("favorites", JSON.stringify(favorites));

//         displayFavorites();

//     } else { 
//         alert("This is already a favorite")
//     }
// }

// function displayFavorites() {
//     const favoritesList = JSON.parse(localStorage.getItem("favoriteMovieList"));
//     favoritesList.innerHTML = '';

//     const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//     favorites.forEach((movie) => {
//         const list = document.createElement('li');
//         list.textContent = movie.Title;
//         favoritesList.appendChild(list);
//     })
// }


// End add favorite

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
            <img src="${result.Poster}" alt="${result.Title}"/>
        `;
        broadSearchResults.appendChild(broadList);
    })
}
// Slut Visa sökresultat för bred sökning

// Eventlyssnare för sökknappen och enterknapp

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    console.log(query);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();      
    }
});

searchBtn.addEventListener("click", function() {
    const query = searchInput.value.trim();
    window.location.href = "search.html?s=" + query                
})

console.log('api end')