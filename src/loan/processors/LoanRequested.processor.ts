import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoanRequestedEvent } from '../events/LoanRequested.event';

@EventsHandler(LoanRequestedEvent)
export class LoanRequestedProcessor
  implements IEventHandler<LoanRequestedEvent>
{
  handle(event: LoanRequestedEvent) {
    console.log(event);
  }
}
