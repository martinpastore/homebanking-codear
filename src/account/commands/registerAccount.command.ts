import { AccountDto } from '../account.dto';

export class RegisterAccountCommand {
  constructor(public readonly data: Partial<AccountDto>) {}
}
