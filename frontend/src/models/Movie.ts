export default interface Movie {
  _id: string,
  genres: string[],
  movieId: number,
  title: string,
  year: string,
  imdbId: number,
  tmdbId: number,
  posterPath: string,
  backdropPath: string,
  overview: string,
  voteAverage: number
}