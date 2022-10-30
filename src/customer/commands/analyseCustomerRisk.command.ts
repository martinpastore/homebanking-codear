import { CustomerDto } from '../customer.dto';

export class AnalyseCustomerRiskCommand<T> {
  constructor(
    public readonly data: Partial<CustomerDto>,
    public readonly event: T,
  ) {}
}
