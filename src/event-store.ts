import { EventStoreDBClient, FORWARDS, START } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString(
  'esdb://localhost:2117?tls=false',
);

const connect = async () => {
  await client.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 1,
  });
};

export { client, connect };
