import { LoanDto } from '../loan.dto';

export class RejectLoanCommand {
  constructor(public readonly data: Partial<LoanDto>) {}
}
