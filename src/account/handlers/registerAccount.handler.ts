import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { Account } from '../account';
import { RegisterAccountCommand } from '../commands/registerAccount.command';

@CommandHandler(RegisterAccountCommand)
export class RegisterAccountCommandHandler
  implements ICommandHandler<RegisterAccountCommand>
{
  account: Account;
  constructor(
    private _prismaService: PrismaService,
    private _eventBus: EventBus,
  ) {
    this.account = new Account(this._prismaService, this._eventBus);
  }

  async execute(command: RegisterAccountCommand) {
    const { data } = command;

    const result = await this._prismaService.account.findFirst({
      where: {
        customer_id: data.customerId,
      },
    });

    if (result)
      throw new Error(
        `Account for customer ${data.customerId} already created.`,
      );

    if (!data.customerId)
      throw new Error('Customer id is required to request a account');

    return this.account.register(data);
  }
}
