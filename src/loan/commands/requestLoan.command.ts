import { LoanDto } from '../loan.dto';

export class RequestLoanCommand {
  constructor(public readonly data: Partial<LoanDto>) {}
}
