const {PubSub} = require('@google-cloud/pubsub');

const projectId = 'pubsubtest-433120';
const subscriptionName = 'my-subscription';
const topicName = 'my-topiec';

const pubsub = new PubSub({projectId});

async function createSubscription() {
  try {
    await pubsub.topic(topicName).createSubscription(subscriptionName);
    console.log(`Subscription ${subscriptionName} created.`);
  } catch (error) {
    if (error.code === 6) {
      console.log(`Subscription ${subscriptionName} already exists.`);
    } else {
      console.error('Error creating subscription:', error);
    }
  }
}

function listenForMessages() {
  const subscription = pubsub.subscription(subscriptionName);

  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
    message.ack();
  };

  subscription.on('message', messageHandler);

  console.log(`Listening for messages on ${subscriptionName}...`);
}

async function main() {
  await createSubscription();
  listenForMessages();
}

main().catch(console.error);
