// jquery
// $('#search-button').on('click', function(){
//   $.ajax({
//     url : 'http://www.omdbapi.com/?apikey=f8359a9c&s=' + $('#search-film').val(),
//     success: result => {
//       const movies = result.Search;
//       let cards = '';
//       movies.forEach(m => {
//         cards += showCards(m)
//       });
//       $('#divCards').html(cards);
  
//       // modal diklik
//       $('.modal-button').on('click', function(){
//         $.ajax({
//           url: 'http://www.omdbapi.com/?apikey=f8359a9c&i=' + $(this).data('imdbid'),
//           success : m => {
//             const movieDetail= showMovieDetail(m)
  
//               $('#modalBody').html(movieDetail)
//           },
//           error : (e) => {
//             console.log(e);
//           }
//         })
//       });
//     },
//     error: e => {
//       console.log(e);
//     }
//   });
// });

// fetch
// const searchButton = document.querySelector('#search-button');
// searchButton.addEventListener('click', function(){

//   const searchFilm = document.querySelector('#search-film')
//   fetch('http://www.omdbapi.com/?apikey=f8359a9c&s=' + searchFilm.value)
//   .then(response => response.json())
//   .then(response => {
//     const movies = response.Search;
//     let cards = '';
//     movies.forEach(m => {
//       cards += showCards(m)
//     });
//     const divMovies = document.getElementById('divCards');
//     divMovies.innerHTML = cards;

//     // tombol detail
//     const modalDetailsButton = document.querySelectorAll('.modal-button');
//     modalDetailsButton.forEach(btn => {
//       btn.addEventListener('click', function(){
//         fetch('http://www.omdbapi.com/?apikey=f8359a9c&i=' + this.dataset.imdbid)
//         .then(response => response.json())
//         .then(m => {
//           const movieDetail = showMovieDetail(m);
//           const modalBody = document.querySelector('#modalBody');
//           modalBody.innerHTML = movieDetail;
//         })
//       })
//     })
//   });
// })

// fetch
const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', async function(){
  const searchFilm = document.querySelector('#search-film');
  const movies = await getMovies(searchFilm.value);
  updateUI(movies);
})

// detail diklik menggunakan event binding
document.addEventListener('click', async function(e){
  if(e.target .classList.contains('modal-detail-button')){
    const movieDetail = await getMoviesDetail(e.target.dataset.imdbid)
    updateUIDetail(movieDetail);
  }
})


function getMoviesDetail(imdbID){
  return fetch('http://www.omdbapi.com/?apikey=f8359a9c&i=' + imdbID)
  .then(response => response.json())
  .then(m => m)
}

function updateUIDetail(m){
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector('#modalBody');
  modalBody.innerHTML = movieDetail;
}

function showCards(m){
  return `<div class="group relative">
              <img
                src="${m.Poster}"
                class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div class="mt-4">
                <h5 class="text-slate-900 text-lg xl:text-2xl font-bold ">${m.Title}</h5>
                <h6 class="text-slate-600">${m.Year}</h6>
                <!-- Modal toggle -->
<button data-modal-target="default-modal" data-imdbid="${m.imdbID}" data-modal-toggle="default-modal" class="modal-detail-button block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Details
</button>
              </div>
            </div>`
}

function showMovieDetail(m){
  return `<div class="p-4 md:p-5 xl:grid xl:grid-cols-2">
              <div class="">
                <img src="${m.Poster}" />
              </div>
              <div class="">
                <ul>
                  <li
                    class="leading-relaxed text-gray-900 text-2xl"
                  >
                    ${m.Title} (${m.Year})
                  </li>
                  <li
                    class="mt-3 text-base leading-relaxed text-gray-500"
                  >
                    Runtime : ${m.Runtime}
                  </li>
                  <li
                    class="text-base leading-relaxed text-gray-500"
                  >
                    Genre : ${m.Genre}
                  </li>
                  <li
                    class="text-base leading-relaxed text-gray-500"
                  >
                    Director : ${m.Director}
                  </li>
                  <li
                    class="text-base leading-relaxed text-gray-500 mt-3"
                  >
                    Actors : ${m.Actors}
                  </li>
                  <li
                    class="text-base leading-relaxed text-gray-500 mt-3"
                  >
                    Writer : ${m.Writer}
                  </li>
                  <li
                    class="text-base leading-relaxed text-gray-500"
                  >
                    Plot : ${m.Plot}
                  </li>
                </ul>
              </div>
            </div>` 
}

function getMovies(searchFilm){
  return fetch('http://www.omdbapi.com/?apikey=f8359a9c&s=' + searchFilm)
  .then(response => response.json())
  .then(response => response.Search)
}

function updateUI(movies){
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const divMovies = document.getElementById('divCards');
    divMovies.innerHTML = cards;
}