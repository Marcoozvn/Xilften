import { QueueOptions } from 'bull'

export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
} as QueueOptions
