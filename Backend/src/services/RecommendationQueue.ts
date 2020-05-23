import Queue from 'bull'
import redisConfig from '../config/redis'
import User, { UserInterface } from '../schemas/User'

const RecommendationQueue = new Queue('RecommendationQueue', {
  redis: redisConfig
})

// Recalcula a recomendação de todos os usuários diariamente
// cron: minutos(0-59) horas(0-23) dia(1-31) mês(1-12) dia da semana(0-6)
// 00 00 * * * => Executado todo dia às 00:00
User.find({ userId: null }).then((users: UserInterface[]) => {
  users.forEach((user: UserInterface) => RecommendationQueue.add('Recommendation', user._id, { repeat: { cron: '16 16 * * *' } }))
})

export default RecommendationQueue
