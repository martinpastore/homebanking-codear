export enum LoanStatesEnum {
  requested = 'requested',
  approved = 'approved',
  rejected = 'rejected',
}

export enum LoanEventTypeEnum {
  RequestLoan = 'RequestLoan',
  ApproveLoan = 'ApproveLoan',
}

export class LoanDto {
  id!: string;
  amount!: number;
  customerId!: string;
  state!: LoanStatesEnum;
  createdAt!: string;
  updatedAt: string;
}
