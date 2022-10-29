import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanController } from './loan/loan.controller';
import { LoanService } from './loan/loan.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { PrismaService } from './prisma/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RequestLoanCommandHandler } from './loan/handlers/requestLoan.handler';
import { ApproveLoanCommandHandler } from './loan/handlers/approveLoan.handler';

const CommandHandlers = [RequestLoanCommandHandler, ApproveLoanCommandHandler];
const Processors = [];

@Module({
  imports: [CqrsModule],
  controllers: [AppController, LoanController, CustomerController],
  providers: [
    AppService,
    LoanService,
    CustomerService,
    PrismaService,
    ...CommandHandlers,
    ...Processors,
  ],
})
export class AppModule {}
