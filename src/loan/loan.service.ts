import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Loan } from './loan';
import { LoanDto } from './loan.dto';

@Injectable()
export class LoanService {
  private _loan: Loan;

  constructor(private prisma: PrismaService) {
    this._loan = new Loan(this.prisma);
  }

  async requestLoan(data: Partial<LoanDto>): Promise<Loan> {
    return this._loan.request(data);
  }

  async approveLoan(data: Partial<LoanDto>): Promise<Loan> {
    return this._loan.approve(data);
  }
}
