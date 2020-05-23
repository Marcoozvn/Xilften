import Rating from '../schemas/Rating'
import { Request, Response } from 'express'
import LoadDataService from '../services/LoadDataService'
import { Schema } from 'mongoose'

class RatingController {
  async rateMovie (req: Request, res: Response): Promise<Response> {
    try {
      const { userId, movieId, rate, comment } = req.body

      await Rating.findOneAndUpdate({ userId: userId, movieId: movieId }, { rate: rate, comment: comment }, { upsert: true })

      return res.status(200).send({ message: 'Avaliacao salva com sucesso.' })
    } catch (error) {
      return res.status(500).send({ error: error })
    }
  }

  async getRatings (req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId as unknown as Schema.Types.ObjectId
      const ratings = await Rating.find({ userId })

      return res.status(200).send(ratings)
    } catch (error) {
      return res.status(500).send({ error: error })
    }
  }

  async loadFromCSV (req: Request, res: Response): Promise<Response> {
    await LoadDataService.loadRatingsFromCSV()

    return res.send('Avaliações carregadas com sucesso')
  }
}

export default new RatingController()
