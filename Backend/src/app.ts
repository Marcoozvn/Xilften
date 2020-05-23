import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
import RecommendationQueue from './services/RecommendationQueue'
import BullBoard from 'bull-board'

const app = express()
BullBoard.setQueues(RecommendationQueue)

// Setup mongoose connection
mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/Xilften`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, async (err) => {
  if (err) console.log('Some problem with the connection ' + err)
  else console.log('The mongoose connection is ready')
})

app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/admin/queues', BullBoard.UI)

app.get('/', (req, res) => {
  return res.send('Hello world')
})

export default app
