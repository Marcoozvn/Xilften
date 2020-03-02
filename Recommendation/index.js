const { Kafka } = require('kafkajs');
const Recommendation = require('./src/controllers/Recommendation');
const mongoose   = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/TurmalinaFims', {useNewUrlParser: true, useCreateIndex: true}, async (err) => {
    if (err) console.log('Some problem with the connection ' + err);
    else console.log('The mongoose connection is ready');
});

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'refineRecommendation', fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const userId = message.value.toString();
      Recommendation.getRecommendation(userId);
    },
  })
}

run();