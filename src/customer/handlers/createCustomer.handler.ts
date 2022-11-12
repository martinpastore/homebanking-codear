import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerCommand } from '../commands/createCustomer.command';
import { Customer } from '../customer';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  customer: Customer;
  constructor(
    private _prismaService: PrismaService,
    private _eventBus: EventBus,
  ) {
    this.customer = new Customer(this._prismaService, this._eventBus);
  }

  async execute(command: CreateCustomerCommand) {
    const { data } = command;

    if (!data.firstName || !data.lastName)
      throw new Error('Missing required fields to create a customer');

    return this.customer.create(data);
  }
}
