import { IsString, IsOptional, IsNumber, IsDate, IsEnum, IsBoolean, IsUUID } from 'class-validator';

export class CreateAssetDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUUID()
    typeId?: string;

    @IsUUID()
    userId: string;

    @IsOptional()
    @IsNumber()
    initialValue?: number;

    @IsOptional()
    @IsNumber()
    monthlyContribution?: number;

    @IsDate()
    startDate: Date;

    @IsOptional()
    @IsDate()
    endDate?: Date;

    @IsOptional()
    @IsNumber()
    rateOfInterest?: number;

    @IsOptional()
    @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
    riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';

    @IsOptional()
    @IsUUID()
    linekedGoalId?: string;

    @IsOptional()
    @IsBoolean()
    isLinkedGoal?: boolean;

    @IsOptional()
    @IsNumber()
    currentValue?: number;

    @IsUUID()
    currencyId: string;
}
