export function changeMoviesList(genre, movies) {
  return {
    type: 'MOVIE_LIST_CHANGED',
    genre,
    movies
  }
}

export function changeMoviesDetails(genre, details) {
  return {
    type: 'MOVIE_DETAILS_CHANGED',
    genre,
    details: details
  }
}

export function changeMoviesOffset(genre, offset) {
  return {
    type: 'MOVIE_OFFSET_CHANGED',
    genre,
    offset
  }
}

export function changeMoviesPerPage(genre, moviesPerPage) {
  return {
    type: 'MOVIES_PERPAGE_CHANGED',
    genre,
    moviesPerPage
  }
}