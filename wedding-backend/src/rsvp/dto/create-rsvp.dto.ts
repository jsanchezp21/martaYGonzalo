import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRsvpDto {
  @IsBoolean() attending!: boolean;
  @IsString() firstName!: string;
  @IsString() lastName!: string;
  @IsOptional() @IsEmail() email?: string;
  @Type(() => Number) @IsInt() @Min(0) @Max(10) plusOnes!: number;
  @IsOptional() @IsString() companions?: string;
  @IsEnum(['ida','ida_vuelta','ninguno']) bus!: 'ida'|'ida_vuelta'|'ninguno';
  @IsBoolean() dietaryRestrictions!: boolean;
  @IsOptional() @IsString() dietaryDetails?: string;
  @IsOptional() @IsString() message?: string;
}
