import { Body, Controller, Post } from '@nestjs/common';
import { LoanDto, LoanEventTypeEnum } from './loan.dto';
import { LoanService } from './loan.service';

type Body = {
  command: Partial<LoanDto>;
  commandName: string;
};

const commandMap = new Map<string, string>([
  [LoanEventTypeEnum.RequestLoan, 'requestLoan'],
  [LoanEventTypeEnum.ApproveLoan, 'approveLoan'],
]);

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async command(@Body() body: Body): Promise<LoanDto> {
    const commandAction = commandMap.get(body.commandName);

    const result = await this.loanService[commandAction](body.command);
    return result.props;
  }
}
