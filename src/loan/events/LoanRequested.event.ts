import { LoanStatesEnum } from '../loan.dto';

export class LoanRequestedEvent {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly state: LoanStatesEnum,
    public readonly customerId: string,
    public readonly createdAt: string,
  ) {}
}
