export enum AccountStatesEnum {
  approved = 'approved',
}

export enum AccountEventTypeEnum {
  RegisterAccount = 'RegisterAccount',
}

export class AccountDto {
  id!: string;
  status!: AccountStatesEnum;
  number!: string;
  currentAmount!: number;
  customerId!: string;
  createdAt!: string;
  updatedAt: string;
}
