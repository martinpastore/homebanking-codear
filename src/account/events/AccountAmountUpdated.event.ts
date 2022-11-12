export class AccountAmountUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly currentAmount: number,
    public readonly updatedAt: string,
  ) {}
}
