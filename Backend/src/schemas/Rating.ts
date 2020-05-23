import { Schema, model, Document } from 'mongoose'

interface RatingInterface extends Document {
  userId: Schema.Types.ObjectId;
  movieId: Schema.Types.ObjectId;
  rate: number;
}

const RatingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  }
})

export default model<RatingInterface>('Rating', RatingSchema)
