import { Body, Controller, Post } from '@nestjs/common';
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
}
