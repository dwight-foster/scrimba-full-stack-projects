
const searchBar = document.getElementById('search-bar');
const searchForm = document.getElementById('search');
const movies = document.getElementById('movies');
const watchlistMovies = document.getElementById('watchlist-movies');
let currentMovies = [];


if (!localStorage.getItem('watchlist')) {
    localStorage.setItem('watchlist', JSON.stringify([]));
}

if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchVal = searchBar.value;
        const res = await fetch(`http://www.omdbapi.com/?apikey=APIKEY=${searchVal}`);
        const data = await res.json();
        currentMovies = []
        const htmlText = await Promise.all(data.Search.slice(0, 6).map(async (movie) => {
            const id = movie.imdbID;
            const res = await fetch(`http://www.omdbapi.com/?apikey=APIKEY&i=${id}`);
            const data = await res.json();
            currentMovies.push(data);
            return `
                    <div class="movie">
                        <img class="movie-img" src="${data.Poster}">
                        <div class="movie-text">
                            <div class="top-text">
                                <h2>${data.Title}</h2> 
                                <p><i class="fa-regular fa-star"></i>${data.imdbRating}/p>
                            </div>
                            <div class="middle-text">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <button id="add"><i class="fa-solid fa-circle-plus" data-add="${id}"></i>Watchlist</button>
                            </div>
                            <p class="description">
                                ${data.Plot}
                            </p>
                        </div>

                    </div>
            `
        }));
        movies.innerHTML = htmlText.join('');
        console.log(currentMovies);
    }) 
}

document.addEventListener('click', (e) => {
    const addButton = document.getElementById('add');
    if (e.target.dataset.add) {
        const movie = currentMovies.filter((m) => {
            return m.imdbID === e.target.dataset.add;
            
        });
        const watchlist = JSON.parse(localStorage.getItem('watchlist'));
        watchlist.push(movie[0]);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log(addButton);
        if (addButton) {
            addButton.innerHTML = `<i class="fa-solid fa-circle-minus" data-remove="${movie[0].imdbID}"></i>Remove`;
        }

    }
    if (e.target.dataset.remove) {
        let watchlist = JSON.parse(localStorage.getItem('watchlist'));
        watchlist = watchlist.filter((m) => {
            return m.imdbID !== e.target.dataset.remove;
            
        });
        console.log(watchlist);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        if (addButton) {
            addButton.innerHTML = `<i class="fa-solid fa-circle-plus" data-add="${e.target.dataset.remove}"></i>Watchlist`;
        }
        if (watchlistMovies) {
            renderWatchlist(watchlist);
        }

    }
})

function renderWatchlist(movies) {
    if (movies.length > 0) {
        const htmlText = movies.map((movie) => {
            return `
                        <div class="movie">
                            <img class="movie-img" src="${movie.Poster}">
                            <div class="movie-text">
                                <div class="top-text">
                                    <h2>${movie.Title}</h2> 
                                    <p><i class="fa-regular fa-star"></i>${movie.imdbRating}</p>
                                </div>
                                <div class="middle-text">
                                    <p>${movie.Runtime}</p>
                                    <p>${movie.Genre}</p>
                                    <button><i class="fa-solid fa-circle-minus" data-remove="${movie.imdbID}"></i>Remove</button>
                                </div>
                                <p class="description">
                                    ${movie.Plot}
                                </p>
                            </div>

                        </div>
                `
        }).join('');
        watchlistMovies.innerHTML = htmlText;
    } else {
        watchlistMovies.innerHTML = `
                                    <div class="empty-movies">
                                        <h2>Your watchlist is looking a little empty...</h2>
                                        <div class="add-movies">
                                            <button id="return-add"><i class="fa-solid fa-circle-plus"></i></button>
                                            <p>Let's add some movies!</p>
                                        </div>

                                    </div>`;

    }


}

if (watchlistMovies) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    console.log(watchlist);
    renderWatchlist(watchlist);
}