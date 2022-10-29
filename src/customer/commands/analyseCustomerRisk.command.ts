import { CustomerDto } from '../customer.dto';

export class AnalyseCustomerRiskCommand {
  constructor(public readonly data: Partial<CustomerDto>) {}
}
