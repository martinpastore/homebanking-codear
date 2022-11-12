import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { Account } from '../account';
import { UpdateAccountAmountCommand } from '../commands/updateAccountAmount.command';

@CommandHandler(UpdateAccountAmountCommand)
export class UpdateAccountAmountCommandHandler
  implements ICommandHandler<UpdateAccountAmountCommand>
{
  account: Account;
  constructor(
    private _prismaService: PrismaService,
    private _eventBus: EventBus,
  ) {
    this.account = new Account(this._prismaService, this._eventBus);
  }

  async execute(command: UpdateAccountAmountCommand) {
    const { customerId, amount } = command;

    if (!amount) throw new Error('Amount is required.');

    const result = await this._prismaService.account.findFirst({
      where: {
        customer_id: customerId,
      },
    });

    if (!result) return;

    const newCurrentAmount = result.current_amount + amount;

    return this.account.updateCurrentAmount({
      id: result.id,
      currentAmount: newCurrentAmount,
    });
  }
}
