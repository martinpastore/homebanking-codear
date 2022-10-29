import * as Bluebird from 'bluebird';
import {
  EventStoreDBClient,
  FORWARDS,
  persistentSubscriptionToStreamSettingsFromDefaults,
  START,
} from '@eventstore/db-client';
import { Logger } from '@nestjs/common';

type PersistentSuscription = {
  stream: string;
  group: string;
};

type Opts = {
  persistentSuscriptions: PersistentSuscription[];
};

const client = EventStoreDBClient.connectionString(
  'esdb://localhost:2117?tls=false',
);

const createSuscriptions = async (
  opts: PersistentSuscription,
): Promise<void> => {
  const options = {
    requiresLeader: true,
  };

  const suscription = await client.getPersistentSubscriptionToStreamInfo(
    opts.stream,
    opts.group,
  );

  if (suscription?.status === 'Live') return;

  Logger.log(`Creating persistent subscription for ${opts.stream}`);

  return client.createPersistentSubscriptionToStream(
    opts.stream,
    opts.group,
    persistentSubscriptionToStreamSettingsFromDefaults(),
    options,
  );
};

const connect = async (opts: Opts) => {
  await client.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 1,
  });

  await Bluebird.mapSeries(
    opts.persistentSuscriptions,
    async (it: PersistentSuscription) => {
      await createSuscriptions(it);
    },
  );

  Logger.log(`Connection to EventStore created successfully!`);
};

export { client, connect };
