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
import { CustomerAnalysisApprovedProcessor } from './loan/processors/CustomerAnalysisApproved.processor';
import { CustomerAnalysisRejectedProcessor } from './loan/processors/CustomerAnalysisRejected.processor';
import { RejectLoanCommandHandler } from './loan/handlers/rejectLoan.handler';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';
import { RegisterAccountCommandHandler } from './account/handlers/registerAccount.handler';
import { CustomerCreatedProcessor } from './account/processors/CustomerCreated.processor';
import { LoanApprovedProcessor } from './account/processors/LoanApproved.processor';
import { UpdateAccountAmountCommandHandler } from './account/handlers/updateAccountAmount.handler';

const CommandHandlers = [
  RequestLoanCommandHandler,
  ApproveLoanCommandHandler,
  RejectLoanCommandHandler,
  CreateCustomerCommandHandler,
  AnalyseCustomerRiskCommandHandler,
  RegisterAccountCommandHandler,
  UpdateAccountAmountCommandHandler,
];
const Processors = [
  LoanRequestedProcessor,
  CustomerAnalysisApprovedProcessor,
  CustomerAnalysisRejectedProcessor,
  CustomerCreatedProcessor,
  LoanApprovedProcessor,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    AppController,
    LoanController,
    CustomerController,
    AccountController,
  ],
  providers: [
    AppService,
    LoanService,
    CustomerService,
    PrismaService,
    AccountService,
    ...CommandHandlers,
    ...Processors,
  ],
})
export class AppModule {}
