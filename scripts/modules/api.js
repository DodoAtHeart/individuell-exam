// import oData from '../data/data.js';

// export async function fetchTopMovies() {
//     const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
//     let movies = await response.json();
//     oData.topMovieList = movies;
// }

// // Hämta och testa santos api
// async function getMovieList() {
//     const apiSantos = "https://santosnr6.github.io/Data/favoritemovies.json";
//     try {
//       const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }
  
//       const json = await response.json();
//     //   console.log(json);
//       getTopList(json);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
// getMovieList()
// // SLUT hämta och testa api

// // Hämta topp 20 från api
// function getTopList(movies) {
//         console.log(movies)
//         try {
//             movies.forEach((movie, index) => {
//                 console.log(movie);
//                 console.log(movie);
//                 if (index === 19) {
//                     throw new Error('List full');
//                 }   
//             });
//         } catch(error) {
//             console.log('Could not continue', error.message)
//         }
// }

// function sendToTrailers()
// function sendToCard()


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

getMovieList()