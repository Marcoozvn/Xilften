import { MovieInterface } from '../schemas/Movie'
import mongoose from 'mongoose'
import { MongoClient, ObjectID, Db } from 'mongodb'
import { Job } from 'bull'

interface MapInterface<V> {
  [key: number]: V;
  [key: string]: V;
}

interface MultivalueMapInterface<V> {
  [key: number]: MapInterface<V>;
  [key: string]: MapInterface<V>;
}

class RecommendationService {
  private db: Db;

  constructor () {
    this.initializeConnection()
  }

  async initializeConnection (): Promise<void> {
    const client = await new MongoClient(`mongodb://${process.env.MONGO_HOST}:27017`).connect()

    this.db = client.db('Xilften')

    return Promise.resolve()
  }

  async processRecommendation (job: Job): Promise<void> {
    const userId = job.data

    const user = await this.db.collection('users').findOne({ _id: ObjectID.createFromHexString(userId) })
    job.progress(10)

    console.log(`Calculando recomendação para o usuário ${user?.name} `)
    /*
        Dataset com:
        id_user1 : {
          id_film1 : 5,
          id_film2 : 3,
          id_film3 : 4
        },
        id_user2 : {
          ...
        },
        ...
        */
    const dataset = await this.makeDataset()
    job.progress(20)

    const targetRatings = dataset[user._id]

    /*
      id_user1: similaridade,
      id_user2: similaridade,
      ...
      */
    const similarities: MapInterface<number> = {}

    for (const usId in dataset) {
      if (usId !== user._id) {
        const sim = await this.euclideanSimilarity(targetRatings, dataset[usId])
        similarities[usId] = sim
      }
    }
    job.progress(20)
    const similarUsers = await this.getMostSimilars(similarities, 5)
    job.progress(70)
    const movies = await this.getMovies(similarUsers, dataset, targetRatings, user.genres)
    console.log(movies)
    const recommendation = await Promise.all(movies.slice(0, 100).map(async (item: any) => {
      const id = item[0]
      return ObjectID.createFromHexString(id)
    }))

    await this.db.collection('recommendations').updateOne({ user: userId }, {
      $set: { user: userId, movies: recommendation }
    }, { upsert: true })
    job.progress(100)
    console.log('Recomendação salva.')
    return Promise.resolve()
  }

  private async filterMovies (moviesIds: string[], favGenres: string[]): Promise<string[]> {
    console.log('Filter Movies')
    const movies = moviesIds.map(mov => mongoose.Types.ObjectId.createFromHexString(mov))
    const res = await this.db.collection('movies').find({ _id: { $in: movies } }).toArray()
    const mapping: MapInterface<string[]> = {}

    res.forEach((movie: MovieInterface) => { mapping[movie._id] = movie.genres })

    return moviesIds.filter(id => {
      return favGenres.some(genre => mapping[id].includes(genre))
    })
  }

  async getMovies (similarUsers: [string, number][], dataset: MultivalueMapInterface<number>, targetRatings: MapInterface<number>, favGenres: string[]): Promise<[string, number][]> {
    console.log('Get Movies')
    let movies: string[] = []
    for (const simUser in similarUsers) {
      for (const mov in dataset[similarUsers[simUser][0]]) {
        // Exclui da recomendacao filmes ja avaliados pelo target e filmes que não são do gênero de interesse do
        if (!movies.includes(mov) && targetRatings && !targetRatings[mov]) {
          movies.push(mov)
        }
      }
    }
    movies = await this.filterMovies(movies, favGenres)
    // Calcula relevancia: rel = somatorio(avaliacao_do_usuario_x * similaridade_do_usuario_x)
    const moviesRelevances: [string, number][] = []
    for (const mov in movies) {
      let relevance = 0
      for (const user in similarUsers) {
        const ratings = dataset[similarUsers[user][0]]
        const rate = ratings[movies[mov]]

        if (rate) {
          relevance += similarUsers[user][1] * rate
        }
      }

      if (relevance > 0.85) {
        moviesRelevances.push([movies[mov], relevance])
      }
    }

    // Ordena por relevancia
    moviesRelevances.sort(function (first, second) {
      return second[1] - first[1]
    })

    return moviesRelevances
  }

  public getMostSimilars (similarities: MapInterface<number>, k: number): [string, number][] {
    console.log('Get Most Similars')
    const items: [string, number][] = Object.keys(similarities).map(function (key) {
      return [key, similarities[key]]
    })

    items.sort(function (first, second) {
      return second[1] - first[1]
    })

    return items.slice(0, k)
  }

  public euclideanSimilarity (targetRatings: MapInterface<number>, otherUserRatings: MapInterface<number>): number {
    console.log('Euclidean Similarity')
    let coef = 0

    if (targetRatings && targetRatings.length === 0) {
      return 0
    }

    for (const rating in targetRatings) {
      if (rating in otherUserRatings) {
        coef += Math.pow(targetRatings[rating] - otherUserRatings[rating], 2)
      } else {
        coef += Math.pow(targetRatings[rating], 2)
      }
    }

    return 1 / (1 + Math.sqrt(coef))
  }

  async makeDataset (): Promise<MultivalueMapInterface<number>> {
    console.log('Make dataset')
    const dataset: MultivalueMapInterface<number> = {}
    const users = await this.db.collection('users').aggregate([
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'userId',
          as: 'ratings'
        }
      }
    ]).toArray()
    for (const user in users) {
      console.log('Usuário:', user)
      const ratings = users[user].ratings

      const ratingMap: {
        [key: string]: number;
      } = {}

      for (const rat in ratings) {
        const movieId = ratings[rat].movieId
        const rate = ratings[rat].rate
        ratingMap[movieId] = rate
      }

      dataset[users[user]._id] = ratingMap
    }

    return dataset
  }
}

export default new RecommendationService()
