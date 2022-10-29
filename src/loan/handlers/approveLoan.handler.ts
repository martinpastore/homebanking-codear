import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { ApproveLoanCommand } from '../commands/approveLoan.command';
import { Loan } from '../loan';

@CommandHandler(ApproveLoanCommand)
export class ApproveLoanCommandHandler
  implements ICommandHandler<ApproveLoanCommand>
{
  loan: Loan;
  constructor(
    private _prismaService: PrismaService,
    private _eventBus: EventBus,
  ) {
    this.loan = new Loan(this._prismaService, this._eventBus);
  }

  async execute(command: ApproveLoanCommand) {
    const { data } = command;

    return this.loan.approve(data);
  }
}
