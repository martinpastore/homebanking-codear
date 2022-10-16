import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanController } from './loan/loan.controller';
import { LoanService } from './loan/loan.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';

@Module({
  imports: [],
  controllers: [AppController, LoanController, CustomerController],
  providers: [AppService, LoanService, CustomerService],
})
export class AppModule {}
