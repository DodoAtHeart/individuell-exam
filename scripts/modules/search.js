
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

    const searchResults = movies.Search || [];
    const cardContainer = document.getElementById("cardContainer");

    searchResults.forEach((movie, index) => {

        // Card element 
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.setAttribute('data-id', movie.imdbID);
        
        const linkOpen = document.createElement("a");
        linkOpen.setAttribute("href", "movie.html?imdbID=" + movie.imdbID);

        // Add to favorites
        const addToFavoritesBtn = document.createElement("button");
        addToFavoritesBtn.classList.add("favBtnToggle");
        addToFavoritesBtn.innerHTML = "+"
        addToFavoritesBtn.addEventListener("click", function(event) {
            event.preventDefault;
            isFavoriteToggle(event)
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
     
        card.appendChild(linkOpen);
        linkOpen.appendChild(poster);
        linkOpen.appendChild(title);
        cardContainer.appendChild(card);
        card.appendChild(addToFavoritesBtn);

    });

let isFavorite = false    
function isFavoriteToggle(e) {
    isFavorite = !isFavorite;
        
    console.log(e.target.parentNode.getAttribute("data-id"));
    
    const imdbID = e.target.parentNode.getAttribute("data-id");
    const favArray = JSON.parse(localStorage.getItem('favorites')) || [];
    // Lägg till 
       if (favArray.includes(imdbID)) {
            favArray.indexOf(imdbID)
            favArray.splice(favArray.indexOf(imdbID), 1)
        } else {
            favArray.push(imdbID);          
        }
        localStorage.setItem('favorites', JSON.stringify(favArray));
    }

    if (searchResults.length === 0) {
        let searchResultsNone = document.createElement('h3');
        searchResultsNone.classList.add('search-result-none');
        searchResultsNone.innerText='Could not find any movies by that name'
            
        cardContainer.appendChild(searchResultsNone);
    }
}

