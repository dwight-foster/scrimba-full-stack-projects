//  http://www.omdbapi.com/?i=tt3896198&apikey=2ebba396

const searchBar = document.getElementById('search-bar');
const searchForm = document.getElementById('search');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchVal = searchBar.value;
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=2ebba396&s=${searchVal}`);
    const data = await res.json();
    console.log(data);
})