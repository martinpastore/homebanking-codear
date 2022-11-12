import { AccountStatesEnum } from '../account.dto';

export class AccountRegisteredEvent {
  constructor(
    public readonly id: string,
    public readonly number: string,
    public readonly status: AccountStatesEnum,
    public readonly currentAmount: number,
    public readonly customerId: string,
    public readonly createdAt: string,
  ) {}
}
