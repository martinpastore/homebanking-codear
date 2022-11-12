import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Account } from './account';
import { AccountDto } from './account.dto';
import { RegisterAccountCommand } from './commands/registerAccount.command';

@Injectable()
export class AccountService {
  constructor(private commandBus: CommandBus) {}

  async registerAccount(data: Partial<AccountDto>): Promise<Account> {
    return this.commandBus.execute(new RegisterAccountCommand(data));
  }
}
