import * as Bluebird from 'bluebird';
import {
  EventStoreDBClient,
  FORWARDS,
  persistentSubscriptionToStreamSettingsFromDefaults,
  START,
} from '@eventstore/db-client';

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

const createSuscriptions = async (opts: PersistentSuscription) => {
  const options = {
    requiresLeader: true,
  };

  const suscription = await client.getPersistentSubscriptionToStreamInfo(
    opts.stream,
    opts.group,
  );

  if (suscription?.status === 'Live') return;

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
};

export { client, connect };
