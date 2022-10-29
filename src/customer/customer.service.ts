import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from './commands/createCustomer.command';
import { Customer } from './customer';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(private commandBus: CommandBus) {}

  async createCustomer(data: Partial<CustomerDto>): Promise<Customer> {
    return this.commandBus.execute(new CreateCustomerCommand(data));
  }
}
