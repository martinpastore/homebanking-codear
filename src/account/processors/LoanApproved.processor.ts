import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoanApprovedEvent } from '../../loan/events/LoanApproved.event';
import { UpdateAccountAmountCommand } from '../commands/updateAccountAmount.command';

@EventsHandler(LoanApprovedEvent)
export class LoanApprovedProcessor implements IEventHandler<LoanApprovedEvent> {
  constructor(private _commandBus: CommandBus) {}

  async handle(event: LoanApprovedEvent) {
    const { amount, customerId } = event;

    return this._commandBus.execute(
      new UpdateAccountAmountCommand(amount, customerId),
    );
  }
}
