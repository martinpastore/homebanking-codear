import { Body, Controller, Post, Put } from '@nestjs/common';
import { LoanDto } from './loan.dto';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async requestLoan(@Body() requestLoanDto: LoanDto): Promise<LoanDto> {
    const result = await this.loanService.requestLoan(requestLoanDto);
    return result.props;
  }

  @Put('/approve')
  async approveLoan(@Body() approveLoanDto: { id: string }): Promise<LoanDto> {
    const result = await this.loanService.approveLoan(approveLoanDto);
    return result.props;
  }
}
