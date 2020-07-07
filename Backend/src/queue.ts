import 'dotenv/config'
import RecommendationQueue from './services/RecommendationQueue'
import RecommendationService from './services/RecommendationService'

RecommendationQueue.process('Recommendation', async job => {
  await RecommendationService.processRecommendation(job)
})
