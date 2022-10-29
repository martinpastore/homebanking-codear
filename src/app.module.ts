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
import { CreateCustomerCommandHandler } from './customer/handlers/createCustomer.handler';
import { LoanRequestedProcessor } from './customer/processors/LoanRequested.processor';
import { AnalyseCustomerRiskCommandHandler } from './customer/handlers/analyseCustomerRisk.handler';

const CommandHandlers = [
  RequestLoanCommandHandler,
  ApproveLoanCommandHandler,
  CreateCustomerCommandHandler,
  AnalyseCustomerRiskCommandHandler,
];
const Processors = [LoanRequestedProcessor];

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
