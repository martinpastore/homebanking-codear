import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerAnalysisApprovedEvent } from '../../customer/events/CustomerAnalysisApproved.event';
import { getEventsFromStream } from '../../event-store';
import { PrismaService } from '../../prisma/prisma.service';
import { ApproveLoanCommand } from '../commands/approveLoan.command';
import { Loan } from '../loan';
import { LoanDto } from '../loan.dto';

@EventsHandler(CustomerAnalysisApprovedEvent)
export class CustomerAnalysisApprovedProcessor
  implements IEventHandler<CustomerAnalysisApprovedEvent>
{
  constructor(
    private _prismaService: PrismaService,
    private _commandBus: CommandBus,
  ) {}

  async handle(event: CustomerAnalysisApprovedEvent) {
    const {
      metadata: { id },
    } = event;

    const events = await getEventsFromStream(`Loan-${id}`);

    const loan = Loan.create<LoanDto>(events);

    return this._commandBus.execute(new ApproveLoanCommand(loan));
  }
}
