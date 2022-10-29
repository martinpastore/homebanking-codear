import { jsonEvent } from '@eventstore/db-client';
import { AggregateRoot } from '@nestjs/cqrs';
import { client } from './event-store';
import { PrismaService } from './prisma/prisma.service';
import { objectToSnakeCase } from './utils/object';

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

    const result = await client.appendToStream(`${stream}-${id}`, [ev]);
    await this._upsertInReadModel(
      stream,
      data,
      Number(result.nextExpectedRevision),
    );
  }

  private async _upsertInReadModel(
    name: string,
    data: UpserData,
    version: number,
  ): Promise<void> {
    const readModelName = name.toLocaleLowerCase();

    const entity = objectToSnakeCase(data) as UpserData;

    const result = await this._prismaService[readModelName].findFirst({
      where: {
        id: entity.id,
      },
    });

    if (result) {
      return this._prismaService[readModelName].update({
        data: {
          ...entity,
          version,
        },
        where: {
          id: entity.id,
        },
      });
    }

    return this._prismaService[readModelName].create({
      data: {
        ...entity,
        version,
      },
    });
  }
}
