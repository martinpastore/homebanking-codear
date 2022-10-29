import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApproveLoanCommand } from './commands/approveLoan.command';
import { RequestLoanCommand } from './commands/requestLoan.command';
import { Loan } from './loan';
import { LoanDto } from './loan.dto';

@Injectable()
export class LoanService {
  constructor(private commandBus: CommandBus) {}

  async requestLoan(data: Partial<LoanDto>): Promise<Loan> {
    return this.commandBus.execute(new RequestLoanCommand(data));
  }

  async approveLoan(data: Partial<LoanDto>): Promise<Loan> {
    return this.commandBus.execute(new ApproveLoanCommand(data));
  }
}
