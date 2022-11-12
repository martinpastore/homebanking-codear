import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { getEventsFromStream } from '../../event-store';
import { LoanRequestedEvent } from '../../loan/events/LoanRequested.event';
import { PrismaService } from '../../prisma/prisma.service';
import { AnalyseCustomerRiskCommand } from '../commands/analyseCustomerRisk.command';
import { Customer } from '../customer';
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

    const events = await getEventsFromStream(`Customer-${customerId}`);

    const customer = Customer.create<CustomerDto>(events);

    return this._commandBus.execute(
      new AnalyseCustomerRiskCommand<LoanRequestedEvent>(customer, event),
    );
  }
}
