import { Router } from 'express'
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'
import MovieController from './controllers/MovieController'
import RatingController from './controllers/RatingController'
import Recommendation from './controllers/RecommendationController'

const routes = Router()

// Sessão
routes.post('/login', AuthController.login)

// User
routes.post('/user', UserController.create)
routes.put('/user/:id', AuthController.verifyToken, UserController.update)
routes.delete('/user/:id', AuthController.verifyToken, UserController.delete)
routes.post('/user/load', AuthController.verifyToken, UserController.loadFromCSV)

// Filmes
routes.post('/movie/load', AuthController.verifyToken, MovieController.loadFromCSV)
routes.get('/movie', AuthController.verifyToken, MovieController.getAll)
routes.get('/movie/trailer', MovieController.carregaTrailers)
routes.get('/movie/genre/:genre', AuthController.verifyToken, MovieController.getByGenre)
routes.get('/movie/year/:year', AuthController.verifyToken, MovieController.getByDate)
routes.get('/movie/title/:title', AuthController.verifyToken, MovieController.getByTitle)

// Recomendação
routes.get('/recommendation', AuthController.verifyToken, Recommendation.getRecommendation)

// Avaliações
routes.post('/rating/load', AuthController.verifyToken, RatingController.loadFromCSV)
routes.post('/rating', AuthController.verifyToken, RatingController.rateMovie)
routes.get('/rating/:userId', AuthController.verifyToken, RatingController.getRatings)

export default routes
