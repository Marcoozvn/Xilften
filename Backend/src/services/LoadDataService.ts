import CSV from 'csvtojson'
import User from '../schemas/User'
import Rating from '../schemas/Rating'
import Movie from '../schemas/Movie'
import { tmdbApi, apiKey } from '../services/TmdbApi'

class LoadDataService {
  async loadUsersFromCSV (): Promise<void> {
    const csvFilePath = `${process.cwd()}/src/data/ratings.csv`
    const ratingsJsonArray = await CSV().fromFile(csvFilePath)

    for (const rating of ratingsJsonArray) {
      try {
        let user = await User.findOne({ userId: rating.userId })

        if (!user) {
          user = new User({
            userId: rating.userId,
            name: `Fake User Nº ${rating.userId}`,
            username: rating.userId,
            email: `fake.user.${rating.userId}@gmail.com`,
            password: 'FakeUser123'
          })

          await user.save()
          console.log(`Usuário fake nº ${rating.userId} cadastrado com sucesso`)
        }
      } catch (e) {
        // console.log(e);
      }
    }
  }

  async loadRatingsFromCSV (): Promise<void> {
    const csvFilePath = `${process.cwd()}/src/data/ratings.csv`
    const jsonArray = await CSV().fromFile(csvFilePath)

    for (const userRating of jsonArray) {
      try {
        const { movieId, userId, rating } = userRating
        // Busca pelo _id do usuário e do filme no banco
        const user = await User.findOne({ userId: userId })
        const movie = await Movie.findOne({ movieId: movieId })

        // salva com a referencia pro _id (ObjectID)
        if (user && movie) {
          const rat = new Rating({
            userId: user._id,
            movieId: movie._id,
            rate: rating
          })

          await rat.save()
          console.log(`Avaliacao fake ${rat._id} cadastrada com sucesso`)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async loadMoviesFromCSV (): Promise<void> {
    const csvFilePath = `${process.cwd()}/src/data/movies.csv`
    const jsonArray = await CSV().fromFile(csvFilePath)

    const linksPath = `${process.cwd()}/src/data/links.csv`
    const jsonLinksArray = await CSV().fromFile(linksPath)

    console.log(jsonLinksArray[1], jsonArray[1])

    for (let index = 0; index < jsonArray.length; index++) {
      const movie = jsonArray[index]
      const links = jsonLinksArray[index]
      try {
        const { movieId } = movie
        const genres = movie.genres.replace('(no genres listed)', '').split('|')

        const exists = await Movie.findOne({ movieId })

        if (!exists) {
          const {
            data: {
              poster_path: posterPath,
              backdrop_path: backdropPath,
              overview,
              title,
              vote_average: voteAverage,
              release_date: releaseDate
            }
          } = await tmdbApi.get(`/movie/${links.tmdbId}?api_key=${apiKey}&language=pt-BR`)

          const mov = new Movie({
            movieId,
            title,
            year: releaseDate,
            genres,
            imdbId: links.imdbId,
            tmdbId: links.tmdbId,
            posterPath,
            backdropPath,
            overview,
            voteAverage
          })

          await mov.save()
          console.log(`Filme fake nº ${index} de ${jsonArray.length} cadastrado com sucesso. /movie/${links.tmdbId}?api_key=${apiKey}&language=pt-BR`)
        }
      } catch (e) {
        console.log('Erro na request: ' + `/movie/${links.tmdbId}?api_key=${apiKey}&language=pt-BR`)
      }
    }
  }
}

export default new LoadDataService()
