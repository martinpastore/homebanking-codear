import { AccountStatusEnum } from '../customer.dto';

export class CustomerCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly accountNumber: string,
    public readonly accountStatus: AccountStatusEnum,
    public readonly risk: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly createdAt: string,
  ) {}
}
