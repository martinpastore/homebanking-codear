export class CustomerCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly risk: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly createdAt: string,
  ) {}
}
