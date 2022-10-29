import { LoanStatesEnum } from '../loan.dto';

export class LoanApprovedEvent {
  constructor(
    public readonly id: string,
    public readonly state: LoanStatesEnum,
    public readonly updatedAt: string,
  ) {}
}
