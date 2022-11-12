export class UpdateAccountAmountCommand {
  constructor(
    public readonly amount: number,
    public readonly customerId: string,
  ) {}
}
