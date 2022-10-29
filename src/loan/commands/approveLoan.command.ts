import { LoanDto } from '../loan.dto';

export class ApproveLoanCommand {
  constructor(public readonly data: Partial<LoanDto>) {}
}
