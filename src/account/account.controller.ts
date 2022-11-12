import { Body, Controller, Post } from '@nestjs/common';
import { AccountDto, AccountEventTypeEnum } from './account.dto';
import { AccountService } from './account.service';

type Body = {
  command: Partial<AccountDto>;
  commandName: string;
};

const commandMap = new Map<string, string>([
  [AccountEventTypeEnum.RegisterAccount, 'registerAccount'],
]);

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async command(@Body() body: Body): Promise<AccountDto> {
    const commandAction = commandMap.get(body.commandName);

    const result = await this.accountService[commandAction](body.command);
    return result.props;
  }
}
