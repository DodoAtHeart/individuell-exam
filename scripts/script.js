
const favorites = JSON.parse(localStorage.getItem('favorites'));

function fetchFavInfo(imdbID) {
    return fetch(`http://www.omdbapi.com/?apikey=adc90226&s=${imdbID}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "true") {
                return data;
            } else {
                throw new Error(data.Error);
            }
        });
}


async function getFav() {
    const favDetails =[];

    for (let imdbID of favorites) {
        try {
            const movie = await fetchFavInfo(imdbID);
            favDetails.push(movie);
        } catch (error) {
            console.error(`Could not fetch ${imdbID}: ${error.message} `)
        }
    }
    console.log(favDetails);
}
getFav()

getFav().then(favDetails => {
    favDetails.forEach(movie => {
      console.log(`Title: ${movie.Title}, Year: ${movie.Year}`);
    });
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