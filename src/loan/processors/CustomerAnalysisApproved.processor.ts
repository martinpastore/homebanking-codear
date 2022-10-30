import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerAnalysisApprovedEvent } from '../../customer/events/CustomerAnalysisApproved.event';
import { PrismaService } from '../../prisma/prisma.service';
import { objectToCamelCase } from '../../utils/object';
import { ApproveLoanCommand } from '../commands/approveLoan.command';
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

    const result = await this._prismaService.loan.findFirst({
      where: {
        id,
      },
    });

    const loan = objectToCamelCase(result) as LoanDto;

    return this._commandBus.execute(new ApproveLoanCommand(loan));
  }
}
