import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { RequestLoanCommand } from '../commands/requestLoan.command';
import { Loan } from '../loan';

@CommandHandler(RequestLoanCommand)
export class RequestLoanCommandHandler
  implements ICommandHandler<RequestLoanCommand>
{
  loan: Loan;
  constructor(private _prismaService: PrismaService) {
    this.loan = new Loan(this._prismaService);
  }

  async execute(command: RequestLoanCommand) {
    const { data } = command;

    return this.loan.request(data);
  }
}
