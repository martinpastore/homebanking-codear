import { jsonEvent } from '@eventstore/db-client';
import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { client } from './event-store';

export class Aggregate extends AggregateRoot {
  async applyEvents(
    streamName: string,
    event: { type: string; data: any },
  ): Promise<void> {
    const { data, type } = event;
    const ev = jsonEvent({
      type,
      data,
    });

    await client.appendToStream(streamName, [ev]);
  }
}
