import { Aggregate } from '../aggregate';
import { v4 as uuid } from 'uuid';
import { AccountStatusEnum, CustomerDto } from './customer.dto';
import { CustomerCreatedEvent } from './events/CustomerCreated.event';
import { generateAccountNumber } from '../utils/account';
import { CustomerAnalysisRejectedEvent } from './events/CustomerAnalysisRejected.event';
import { CustomerAnalysisApprovedEvent } from './events/CustomerAnalysisApproved.event';

export class Customer extends Aggregate {
  props: CustomerDto;

  private _unwrapProperties(props: Partial<CustomerDto>): CustomerDto {
    const {
      createdAt,
      accountStatus,
      accountNumber,
      risk,
      firstName,
      lastName,
    } = props || this.props;

    this.props = props as CustomerDto;

    if (!createdAt) this.props.createdAt = new Date().toISOString();
    if (!accountStatus) this.props.accountStatus = AccountStatusEnum.pending;
    if (!accountNumber) this.props.accountNumber = generateAccountNumber();
    if (!risk) this.props.risk = 0;
    if (!firstName) this.props.firstName = 'Account';
    if (!lastName) this.props.lastName = 'Holder';

    return this.props;
  }

  async create(data: Partial<CustomerDto>): Promise<Customer> {
    const id = uuid();

    const {
      accountNumber,
      accountStatus,
      risk,
      firstName,
      lastName,
      createdAt,
    } = this._unwrapProperties({ id, ...data });

    await this.applyEvents(
      'Customer',
      id,
      new CustomerCreatedEvent(
        id,
        accountNumber,
        accountStatus,
        risk,
        firstName,
        lastName,
        createdAt,
      ),
    );

    return this;
  }

  analyse(
    customer: Partial<CustomerDto>,
    request: { id: string; amount: number },
  ): Customer {
    const { id, risk } = this._unwrapProperties(customer);

    const event =
      risk > 5
        ? new CustomerAnalysisRejectedEvent(id, {
            id: request.id,
          })
        : new CustomerAnalysisApprovedEvent(id, {
            id: request.id,
          });

    this.applyEvents('Customer', id, event);

    return this;
  }
}
