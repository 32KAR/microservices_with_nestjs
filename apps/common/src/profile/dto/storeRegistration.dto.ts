import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StoreRegistrationDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  store_name: string;

  @IsString()
  @IsNotEmpty()
  address_line_1: string;

  @IsString()
  @IsNotEmpty()
  address_line_2: string;

  @IsString()
  @IsNotEmpty()
  landmark: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  city_id: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  state_id: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  country_id: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  pin_code: number;

  @IsString()
  @IsNotEmpty()
  GSTIN: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  phone_no: number;
}
