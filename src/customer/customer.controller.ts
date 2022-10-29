import { Body, Controller, Post } from '@nestjs/common';
import { CustomerDto, CustomerEventTypeEnum } from './customer.dto';
import { CustomerService } from './customer.service';

type Body = {
  command: Partial<CustomerDto>;
  commandName: string;
};

const commandMap = new Map<string, string>([
  [CustomerEventTypeEnum.CreateCustomer, 'createCustomer'],
]);

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async command(@Body() body: Body): Promise<CustomerDto> {
    const commandAction = commandMap.get(body.commandName);

    const result = await this.customerService[commandAction](body.command);
    return result.props;
  }
}
