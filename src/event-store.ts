import {
  EventStoreDBClient,
  FORWARDS,
  ResolvedEvent,
  START,
  StreamingRead,
} from '@eventstore/db-client';
import { Logger } from '@nestjs/common';

const client = EventStoreDBClient.connectionString(
  'esdb://localhost:2117?tls=false',
);

const _streamToArray = async (
  stream: StreamingRead<ResolvedEvent>,
): Promise<ResolvedEvent[]> => {
  return new Promise((resolve, reject) => {
    const events: ResolvedEvent[] = [];

    if (!stream || !stream.readable) {
      resolve(events);
    } else {
      stream
        .on('data', (resolvedEvent) => {
          events.push({
            event: resolvedEvent.event,
            link: resolvedEvent.link,
            commitPosition: resolvedEvent.commitPosition,
          } as ResolvedEvent);
        })
        .on('error', (err) => {
          stream.removeAllListeners();
          reject(err);
        })
        .on('end', () => {
          stream.removeAllListeners();
          resolve(events);
        });
    }
  });
};

const connect = async () => {
  await client.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 1,
  });

  Logger.log(`Connection to EventStore created successfully!`);
};

const getEventsFromStream = async (streamName: string) => {
  const events = await client.readStream(streamName, {
    fromRevision: START,
    direction: FORWARDS,
  });

  return _streamToArray(events);
};

export { client, connect, getEventsFromStream };
