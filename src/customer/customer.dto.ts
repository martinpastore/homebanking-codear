export enum AccountStatusEnum {
  pending = 'pending',
  active = 'active',
  rejected = 'rejected',
}

export enum CustomerEventTypeEnum {
  CreateCustomer = 'CreateCustomer',
}

export class CustomerDto {
  id!: string;
  accountNumber: string;
  accountStatus: AccountStatusEnum;
  firstName: string;
  lastName: string;
  risk: number;
  createdAt: string;
  updatedAt?: string;
}
