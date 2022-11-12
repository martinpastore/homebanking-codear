import { Aggregate } from '../aggregate';
import { v4 as uuid } from 'uuid';
import { AccountDto, AccountStatesEnum } from './account.dto';
import { generateAccountNumber } from '../utils/account';
import { AccountRegisteredEvent } from './events/AccountRegistered.event';
import { AccountAmountUpdatedEvent } from './events/AccountAmountUpdated.event';

export class Account extends Aggregate {
  props: AccountDto;

  private _unwrapProperties(props: Partial<AccountDto>): AccountDto {
    const { createdAt, status, number, currentAmount } = props || this.props;

    this.props = props as AccountDto;

    if (!createdAt) this.props.createdAt = new Date().toISOString();
    if (!number) this.props.number = generateAccountNumber();
    if (!status) this.props.status = AccountStatesEnum.approved;
    if (!currentAmount) this.props.currentAmount = 0;

    return this.props;
  }

  async register(data: Partial<AccountDto>): Promise<Account> {
    const id = uuid();

    const account = this._unwrapProperties({ id, ...data });

    const { number, status, createdAt, customerId, currentAmount } = account;

    await this.applyEvents(
      'Account',
      id,
      new AccountRegisteredEvent(
        id,
        number,
        status,
        currentAmount,
        customerId,
        createdAt,
      ),
    );

    return this;
  }

  async updateCurrentAmount(data: Partial<AccountDto>): Promise<Account> {
    const account = this._unwrapProperties(data);

    const { id, currentAmount } = account;

    await this.applyEvents(
      'Account',
      id,
      new AccountAmountUpdatedEvent(
        id,
        currentAmount,
        new Date().toISOString(),
      ),
    );

    return this;
  }
}
