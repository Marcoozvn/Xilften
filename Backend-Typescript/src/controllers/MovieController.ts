import Movie from '../schemas/Movie'
import { Request, Response } from 'express'
import LoadDataService from '../services/LoadDataService'

class MovieController {
  async getAll (req: Request, res: Response): Promise<Response> {
    try {
      const allFilms = await Movie.find({})

      if (!allFilms) { return res.status(400).send({ error: 'Não foi possivel recuperar os filmes.' }) }

      return res.status(200).send({ films: allFilms })
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possivel recuperar os filmes.' })
    }
  }

  async getByGenre (req: Request, res: Response): Promise<Response> {
    try {
      const films = await Movie.find({ genres: { $in: [req.params.genre] } })

      if (!films) { return res.status(400).send({ error: 'Não foi possível recuperar os filmes.' }) }

      return res.status(200).send({ films: films })
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível recuperar os filmes.' })
    }
  }

  async getByDate (req: Request, res: Response): Promise<Response> {
    try {
      const films = await Movie.find({ year: new Date(req.params.year) })

      if (!films) { return res.status(400).send({ error: 'Não foi possível recuperar os filmes.' }) }

      return res.status(200).send({ films: films })
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível recuperar os filmes.' })
    }
  }

  async getByTitle (req: Request, res: Response): Promise<Response> {
    try {
      const films = await Movie.find({ title: { $regex: req.params.title, $options: '$i' } })

      if (!films) { return res.status(400).send({ error: 'Não foi possível recuperar os filmes.' }) }

      return res.status(200).send({ films: films })
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível recuperar os filmes.' })
    }
  }

  async loadFromCSV (req: Request, res: Response): Promise<Response> {
    await LoadDataService.loadMoviesFromCSV()

    return res.send('Dados carregados com sucesso')
  }
}

export default new MovieController()
