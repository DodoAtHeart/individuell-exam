im

const favIndex = JSON.parse(localStorage.getItem('favorites'));
// console.log(favIndex);

// Genererar favcards
function generateFavs(favorites) {

    const cardContainer = document.getElementById("cardContainer");
    console.log(favorites);
    
    favorites.forEach((favorite, index) => {
        console.log(favorite);
        
        // Card element 
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.setAttribute('data-id', favorite.id);
        
        const linkOpen = document.createElement("a");
        linkOpen.setAttribute("href", "movie.html?imdbID=" + favorite.id);

        // Title element
        const title = document.createElement("h3");
        title.classList.add("movie-title")
        title.textContent = favorite.title;

        // Add to favorites element
        const addToFavoritesBtn = document.createElement("button");
        addToFavoritesBtn.classList.add("favBtnToggle");
        addToFavoritesBtn.innerHTML = "+"
        addToFavoritesBtn.addEventListener("click", function(event) {
            event.preventDefault;
            isFavoriteToggle(event)
        })

        // Poster element
        const poster = document.createElement("img");
        poster.src = favorite.img;
        poster.onerror = "./res/icons/missing-poster.svg"
        poster.alt = `${favorite.title} poster`;
        poster.classList.add("movie-poster");


        // Display appended objects
        card.appendChild(linkOpen)
        linkOpen.appendChild(poster);
        linkOpen.appendChild(title);
        cardContainer.appendChild(card);
        card.appendChild(addToFavoritesBtn);
    });
}
generateFavs(favIndex);