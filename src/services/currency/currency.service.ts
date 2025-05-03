import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrencyIdByCode(currencyCode: string): Promise<string | null> {
    const currency = await this.prisma.currency.findUnique({
      where: { code: currencyCode },
    });
    return currency ? currency.id : null;
  }

  async saveUserCurrency(userId: string, currencyCode: string): Promise<void> {
    const currencyId = await this.getCurrencyIdByCode(currencyCode);
    if (!currencyId) {
      throw new Error(`Currency with code ${currencyCode} not found`);
    }

    await this.prisma.userCurrency.create({
      data: {
        userId,
        currencyId,
      },
    });
  }
}