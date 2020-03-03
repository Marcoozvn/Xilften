const INITIAL_STATE = {
  'Comedy': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Thriller': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Horror': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Drama': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Adventure': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Musical': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Fantasy': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Animation': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Romance': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Action': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Sci-Fi': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Children': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'War': { list: [], details: null, offset: 0, moviesPerPage: [] },
  'Crime': { list: [], details: null, offset: 0, moviesPerPage: [] }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'MOVIE_LIST_CHANGED':
      return {
        ...state,
        [action.genre]: {
          ...state[action.genre],
          list: action.movies
        }
      }
    case 'MOVIE_DETAILS_CHANGED':
      return {
        ...state,
        [action.genre]: {
          ...state[action.genre],
          details: action.details
        }
      }
    case 'MOVIE_OFFSET_CHANGED':
      return {
        ...state,
        [action.genre]: {
          ...state[action.genre],
          offset: action.offset
        }
      }
    case 'MOVIES_PERPAGE_CHANGED':
    return {
      ...state,
      [action.genre]: {
        ...state[action.genre],
        moviesPerPage: action.moviesPerPage
      }
    }
    default:
      return state;
  }
}