
const getUrl = new URL(window.location.href);
const searchInput = `${getUrl.searchParams.get('s')}`

fetch(`http://www.omdbapi.com/?apikey=adc90226&s=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Could not fetch data:', error);
    });   



// Printa ut resultat

function displaySearchResults(movies) {
    console.log(movies)

    const searchResults = movies.Search || [];
    const cardContainer = document.getElementById("cardContainer");

    searchResults.forEach((movie, index) => {

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

    if (searchResults.length === 0) {
        let searchResultsNone = document.createElement('h3');
        searchResultsNone.classList.add('search-result-none');
        searchResultsNone.innerText='Could not find any movies by that name'
        
        cardContainer.appendChild(searchResultsNone);
    }
}

