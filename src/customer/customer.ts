import { Aggregate } from '../aggregate';
import { v4 as uuid } from 'uuid';
import { CustomerDto } from './customer.dto';
import { CustomerCreatedEvent } from './events/CustomerCreated.event';
import { CustomerAnalysisRejectedEvent } from './events/CustomerAnalysisRejected.event';
import { CustomerAnalysisApprovedEvent } from './events/CustomerAnalysisApproved.event';
import { riskAnalysisRules } from './customer.utils';

export class Customer extends Aggregate {
  props: CustomerDto;

  private _unwrapProperties(props: Partial<CustomerDto>): CustomerDto {
    const { createdAt, risk } = props || this.props;

    this.props = props as CustomerDto;

    if (!createdAt) this.props.createdAt = new Date().toISOString();
    if (!risk) this.props.risk = 0;

    return this.props;
  }

  async create(data: Partial<CustomerDto>): Promise<Customer> {
    const id = uuid();

    const { risk, firstName, lastName, createdAt } = this._unwrapProperties({
      id,
      ...data,
    });

    await this.applyEvents(
      'Customer',
      id,
      new CustomerCreatedEvent(id, risk, firstName, lastName, createdAt),
    );

    return this;
  }

  analyse(
    customer: Partial<CustomerDto>,
    request: { id: string; amount: number },
  ): Customer {
    const { id, risk } = this._unwrapProperties(customer);

    const passed = riskAnalysisRules(risk, request.amount);

    const event = passed
      ? new CustomerAnalysisApprovedEvent(id, {
          id: request.id,
        })
      : new CustomerAnalysisRejectedEvent(id, {
          id: request.id,
        });

    this.applyEvents('Customer', id, event);

    return this;
  }
}
