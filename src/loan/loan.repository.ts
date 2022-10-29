import { PrismaService } from '../prisma/prisma.service';

export class LoanRepository {
  constructor(private prismaService: PrismaService) {}
}
