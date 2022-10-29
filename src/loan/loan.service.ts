import { Injectable } from '@nestjs/common';
import { Loan } from './loan';

@Injectable()
export class LoanService {
  private _loan: Loan;

  constructor() {
    this._loan = new Loan();
  }

  requestLoan(data: any): Promise<Loan> {
    return this._loan.request(data);
  }
}
