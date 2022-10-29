import { Body, Controller, Post } from '@nestjs/common';
import { Loan } from './loan';
import { LoanDto } from './loan.dto';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async requestLoan(@Body() requestLoanDto: LoanDto): Promise<Loan> {
    return this.loanService.requestLoan(requestLoanDto);
  }
}
