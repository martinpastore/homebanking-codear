import { EventStoreDBClient, FORWARDS, START } from '@eventstore/db-client';
import { Logger } from '@nestjs/common';

const client = EventStoreDBClient.connectionString(
  'esdb://localhost:2117?tls=false',
);

const connect = async () => {
  await client.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 1,
  });

  Logger.log(`Connection to EventStore created successfully!`);
};

export { client, connect };
