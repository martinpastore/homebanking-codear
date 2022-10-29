import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { AnalyseCustomerRiskCommand } from '../commands/analyseCustomerRisk.command';
import { Customer } from '../customer';

@CommandHandler(AnalyseCustomerRiskCommand)
export class AnalyseCustomerRiskCommandHandler
  implements ICommandHandler<AnalyseCustomerRiskCommand>
{
  customer: Customer;
  constructor(
    private _prismaService: PrismaService,
    private _eventBus: EventBus,
  ) {
    this.customer = new Customer(this._prismaService, this._eventBus);
  }

  async execute(command: AnalyseCustomerRiskCommand) {
    const { data } = command;

    return this.customer.analyse(data);
  }
}
