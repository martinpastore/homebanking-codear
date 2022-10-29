import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoanRequestedEvent } from '../../loan/events/LoanRequested.event';
import { PrismaService } from '../../prisma/prisma.service';
import { objectToCamelCase } from '../../utils/object';
import { AnalyseCustomerRiskCommand } from '../commands/analyseCustomerRisk.command';
import { CustomerDto } from '../customer.dto';

@EventsHandler(LoanRequestedEvent)
export class LoanRequestedProcessor
  implements IEventHandler<LoanRequestedEvent>
{
  constructor(
    private _prismaService: PrismaService,
    private _commandBus: CommandBus,
  ) {}

  async handle(event: LoanRequestedEvent) {
    const { customerId } = event;

    const result = await this._prismaService.customer.findFirst({
      where: {
        id: customerId,
      },
    });

    const customer = objectToCamelCase(result) as CustomerDto;

    return this._commandBus.execute(new AnalyseCustomerRiskCommand(customer));
  }
}
