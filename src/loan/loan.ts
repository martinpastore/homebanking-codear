import { Aggregate } from '../aggregate';
import { v4 as uuid } from 'uuid';
import { LoanDto } from './loan.dto';
import { LoanRequestedEvent } from './events';

export class Loan extends Aggregate {
  constructor() {
    super();
  }

  async request(data: LoanDto): Promise<void> {
    const id = uuid();

    await this.applyEvents(`Loan-${id}`, {
      type: LoanRequestedEvent,
      data,
    });
  }
}
