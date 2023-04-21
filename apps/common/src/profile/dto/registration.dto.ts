import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class registrationDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email_id: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  phone_no: number;

  @IsEnum({
    Customer: 'Customer',
    Vendor: 'Vendor',
  })
  @IsNotEmpty()
  role: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  otp: number;
}
