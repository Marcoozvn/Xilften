import { Schema, model, Document } from 'mongoose'

export interface RecommendationInterface extends Document {
  user: Schema.Types.ObjectId;
  movies: [Schema.Types.ObjectId];
}

const RecommendationSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
})

export default model<RecommendationInterface>('Recommendation', RecommendationSchema)
