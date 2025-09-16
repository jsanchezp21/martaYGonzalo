import { IsEnum, IsOptional, IsString, IsBooleanString } from 'class-validator';

export class ListRsvpDto {
  @IsOptional() @IsBooleanString() attending?: 'true' | 'false';
  @IsOptional() @IsBooleanString() dietaryRestrictions?: 'true' | 'false';
  @IsOptional() @IsEnum(['ida','ida_vuelta','ninguno']) bus?: 'ida'|'ida_vuelta'|'ninguno';
  @IsOptional() @IsString() q?: string; // nombre, apellido o email
}
