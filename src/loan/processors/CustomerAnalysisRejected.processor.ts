import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerAnalysisRejectedEvent } from '../../customer/events/CustomerAnalysisRejected.event';
import { PrismaService } from '../../prisma/prisma.service';
import { objectToCamelCase } from '../../utils/object';
import { RejectLoanCommand } from '../commands/rejectLoan.command';
import { LoanDto } from '../loan.dto';

@EventsHandler(CustomerAnalysisRejectedEvent)
export class CustomerAnalysisRejectedProcessor
  implements IEventHandler<CustomerAnalysisRejectedEvent>
{
  constructor(
    private _prismaService: PrismaService,
    private _commandBus: CommandBus,
  ) {}

  async handle(event: CustomerAnalysisRejectedEvent) {
    const {
      metadata: { id },
    } = event;

    const result = await this._prismaService.loan.findFirst({
      where: {
        id,
      },
    });

    const loan = objectToCamelCase(result) as LoanDto;

    return this._commandBus.execute(new RejectLoanCommand(loan));
  }
}
