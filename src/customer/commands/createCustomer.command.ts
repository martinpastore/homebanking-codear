import { CustomerDto } from '../customer.dto';

export class CreateCustomerCommand {
  constructor(public readonly data: Partial<CustomerDto>) {}
}
