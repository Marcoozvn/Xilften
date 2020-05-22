import Queue from 'bull'
import redisConfig from '../config/redis'
import User, { UserInterface } from '../schemas/User'

const RecommendationQueue = new Queue('RecommendationQueue', redisConfig)

// Recalcula a recomendação de todos os usuários diariamente
User.find({ userId: null }).then((users: UserInterface[]) => {
  users.forEach((user: UserInterface) => RecommendationQueue.add('Recommendation', user._id, { repeat: { cron: '16 16 * * *' } }))
})

export default RecommendationQueue
