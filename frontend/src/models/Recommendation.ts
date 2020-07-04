import Movie from './Movie'

export default interface Recommendation {
  user: string,
  movies: Movie[]
}