import { jsonEvent } from '@eventstore/db-client';
import { AggregateRoot } from '@nestjs/cqrs';
import { client } from './event-store';
import { PrismaService } from './prisma/prisma.service';

type UpserData = {
  id: string;
  [key: string]: string;
};

export class Aggregate extends AggregateRoot {
  constructor(private _prismaService: PrismaService) {
    super();
  }

  async applyEvents(
    stream: string,
    id: string,
    event: { type: string; data: any },
  ): Promise<void> {
    const { data, type } = event;
    const ev = jsonEvent({
      type,
      data,
    });

    await client.appendToStream(`${stream}-${id}`, [ev]);
    await this._upsertInReadModel(stream, data);
  }

  private async _upsertInReadModel(
    name: string,
    data: UpserData,
  ): Promise<void> {
    const readModelName = name.toLocaleLowerCase();
    const entity = await this._prismaService[readModelName].findFirst({
      where: {
        id: data.id,
      },
    });

    if (entity) {
      return this._prismaService[readModelName].update({
        data,
        where: {
          id: data.id,
        },
      });
    }

    return this._prismaService[readModelName].create({
      data,
    });
  }
}
