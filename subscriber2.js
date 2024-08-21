const {PubSub} = require('@google-cloud/pubsub');

const projectId = 'pubsubtest-433120';
const subscriptionName = 'my-subscription';
const topicName = 'my-topiec';

const pubsub = new PubSub({projectId});



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
  listenForMessages();
}

main().catch(console.error);
