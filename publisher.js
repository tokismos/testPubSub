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

async function publishMessage(tmp) {
  const data = JSON.stringify({message: 'Hello, Pub/Sub!',tmp});
  try {
    const messageId = await pubsub.topic(topicName).publish(Buffer.from(data));
    console.log(`Message ${messageId} published.`);
    // console.log(`Message TMP : ${tmp} .`);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}

async function main() {
  await createTopic();
  for (let i=0;i<10 ;i++){
  await  publishMessage(i)
  }
}

main().catch(console.error);