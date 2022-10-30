import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { RejectLoanCommand } from '../commands/rejectLoan.command';
import { Loan } from '../loan';

@CommandHandler(RejectLoanCommand)
export class RejectLoanCommandHandler
  implements ICommandHandler<RejectLoanCommand>
{
  loan: Loan;
  constructor(
    private _prismaService: PrismaService,
    private _eventBus: EventBus,
  ) {
    this.loan = new Loan(this._prismaService, this._eventBus);
  }

  async execute(command: RejectLoanCommand) {
    const { data } = command;

    return this.loan.reject(data);
  }
}
