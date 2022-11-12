import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerCreatedEvent } from '../../customer/events/CustomerCreated.event';
import { RegisterAccountCommand } from '../commands/registerAccount.command';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedProcessor
  implements IEventHandler<CustomerCreatedEvent>
{
  constructor(private _commandBus: CommandBus) {}

  async handle(event: CustomerCreatedEvent) {
    const { id } = event;

    return this._commandBus.execute(
      new RegisterAccountCommand({ customerId: id }),
    );
  }
}
