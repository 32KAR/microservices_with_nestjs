import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class sendOtpDto {
  @IsString()
  @IsMobilePhone()
  @IsNotEmpty()
  phone_no: string;
}
