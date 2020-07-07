import { Schema, model, Document } from 'mongoose'

export interface MovieInterface extends Document {
  movieId: string;
  title: string;
  year: Date;
  genres: [string];
  imdbId: number;
  tmdbId: number;
  posterPath: string;
  backdropPath: string;
  trailerUrl?: string;
  overview: string;
  voteAverage: number;
}

const MovieSchema = new Schema({
  movieId: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  year: {
    type: Date
  },
  genres: [{
    type: String
  }],
  imdbId: {
    type: Number
  },
  tmdbId: {
    type: Number
  },
  posterPath: {
    type: String
  },
  backdropPath: {
    type: String
  },
  trailerUrl: {
    type: String
  },
  overview: {
    type: String
  },
  voteAverage: {
    type: Number
  }
})

export default model<MovieInterface>('Movie', MovieSchema)
