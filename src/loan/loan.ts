import { Aggregate } from '../aggregate';
import { v4 as uuid } from 'uuid';
import { LoanDto, LoanStatesEnum } from './loan.dto';
import { LoanRequestedEvent } from './events/LoanRequested.event';
import { LoanApprovedEvent } from './events/LoanApproved.event';
import { LoanRejectedEvent } from './events/LoanRejected.event';

export class Loan extends Aggregate {
  props: LoanDto;

  private _unwrapProperties(props: Partial<LoanDto>): LoanDto {
    const { createdAt, state } = props || this.props;

    this.props = props as LoanDto;

    if (!createdAt) {
      this.props.createdAt = new Date().toISOString();
    }

    if (!state) {
      this.props.state = LoanStatesEnum.requested;
    }

    return this.props;
  }

  async request(data: Partial<LoanDto>): Promise<Loan> {
    const id = uuid();

    const loan = this._unwrapProperties({ id, ...data });

    const { amount, state, createdAt, customerId } = loan;

    await this.applyEvents(
      'Loan',
      id,
      new LoanRequestedEvent(id, amount, state, customerId, createdAt),
    );

    return this;
  }

  async approve(data: Partial<LoanDto>): Promise<Loan> {
    await this.applyEvents(
      'Loan',
      data.id,
      new LoanApprovedEvent(
        data.id,
        LoanStatesEnum.approved,
        new Date().toISOString(),
      ),
    );

    return this;
  }

  async reject(data: Partial<LoanDto>): Promise<Loan> {
    await this.applyEvents(
      'Loan',
      data.id,
      new LoanRejectedEvent(
        data.id,
        LoanStatesEnum.rejected,
        new Date().toISOString(),
      ),
    );

    return this;
  }
}
