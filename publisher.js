const {PubSub} = require('@google-cloud/pubsub');

const projectId = 'pubsubtest-433120';
const topicName = 'my-topiec';

const pubsub = new PubSub({projectId});

async function createTopic() {
  try {
    await pubsub.createTopic(topicName);
    console.log(`Topic ${topicName} created.`);
  } catch (error) {
    if (error.code === 6) {
      console.log(`Topic ${topicName} already exists.`);
    } else {
      console.error('Error creating topic:', error);
    }
  }
}

async function publishMessage() {
  const data = JSON.stringify({message: 'Hello, Pub/Sub!'});
  try {
    const messageId = await pubsub.topic(topicName).publish(Buffer.from(data));
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}

async function main() {
  await createTopic();
await publishMessage() 
await publishMessage() 
await publishMessage() 
}

main().catch(console.error);