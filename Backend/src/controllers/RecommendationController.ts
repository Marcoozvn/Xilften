import Recommendation from '../schemas/Recommendation'
import Movie from '../schemas/Movie'
import { Request, Response } from 'express'
import RecommendationQueue from '../services/RecommendationQueue'

class RecommendationController {
  async getRecommendation (req: Request, res: Response): Promise<Response> {
    const userId = res.locals.user
    const recommendation = await Recommendation.findOne({ user: userId }).populate('movies')

    if (recommendation) {
      return res.json(recommendation)
    }

    const initialRecommendation = await Movie.find({}).limit(50)

    RecommendationQueue.add({ userId })

    return res.json({
      user: userId,
      movies: initialRecommendation
    })
  }
}

export default new RecommendationController()
