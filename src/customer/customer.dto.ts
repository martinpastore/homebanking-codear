export enum CustomerEventTypeEnum {
  CreateCustomer = 'CreateCustomer',
}

export class CustomerDto {
  id!: string;
  firstName: string;
  lastName: string;
  risk: number;
  createdAt: string;
  updatedAt?: string;
}
