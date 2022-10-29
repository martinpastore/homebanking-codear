import { Aggregate } from '../aggregate';
import { v4 as uuid } from 'uuid';
import { LoanDto } from './loan.dto';
import { LoanRequestedEvent } from './events';

export class Loan extends Aggregate {
  props: LoanDto;

  private _unwrapProperties(props: LoanDto): LoanDto {
    this.props = props || this.props;

    return this.props;
  }

  async request(data: LoanDto): Promise<Loan> {
    const id = uuid();

    const loan = this._unwrapProperties({ id, ...data });

    await this.applyEvents('Loan', id, {
      type: LoanRequestedEvent,
      data: loan,
    });

    return this;
  }
}
