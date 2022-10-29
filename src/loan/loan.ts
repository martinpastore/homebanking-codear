import { Aggregate } from '../aggregate';
import { v4 as uuid } from 'uuid';
import { LoanDto, LoanStatesEnum } from './loan.dto';
import { LoanApprovedEvent, LoanRequestedEvent } from './events';

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

    await this.applyEvents('Loan', id, {
      type: LoanRequestedEvent,
      data: loan,
    });

    return this;
  }

  async approve(data: Partial<LoanDto>): Promise<Loan> {
    await this.applyEvents('Loan', data.id, {
      type: LoanApprovedEvent,
      data: {
        ...data,
        state: LoanStatesEnum.approved,
        updatedAt: new Date().toISOString(),
      },
    });

    return this;
  }
}
