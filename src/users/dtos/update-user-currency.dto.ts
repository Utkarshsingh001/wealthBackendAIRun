import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserCurrencyDto {
  @IsString()
  @IsNotEmpty()
  currency: string;
}