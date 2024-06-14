const APIURL =
    "https://tv-api.com/en/API/Top250Movies/k_12345678  ";
//most popular movies

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
//searched movie

const movieBox = document.querySelector("#movie-box");

//async as fetching 3rd party url data
const getMovies= async(api) => {
     const response = await fetch(api);  //thoda wait to fetch
     const data = await response.json()
     //console.log(data);
     showMovies(data.results);

}

const showMovies=(data)=>{
    data.forEach(
        (item) => {
             co
        }
    )
    //console.log(data);
}

//initial call
getMovies(APIURL);