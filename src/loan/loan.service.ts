import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Loan } from './loan';

@Injectable()
export class LoanService {
  private _loan: Loan;

  constructor(private prisma: PrismaService) {
    this._loan = new Loan(this.prisma);
  }

  async requestLoan(data: any): Promise<Loan> {
    return this._loan.request(data);
  }
}
