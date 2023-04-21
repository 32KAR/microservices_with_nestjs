import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { registrationDto } from './dto/registration.dto';
import { StoreRegistrationDto } from './dto/storeRegistration.dto';
import { sendOtpDto } from './dto/sendOtp.dto';

@Controller()
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sendOtpRegistration')
  sendOtpRegistration(@Body() dto: sendOtpDto) {
    return this.profileService.sendOtpRegistration(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  registration(@Body() dto: registrationDto) {
    return this.profileService.registration(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('storeRegistration')
  storeRegistration(@Body() dto: StoreRegistrationDto) {
    return this.profileService.storeRegistration(dto);
  }
}
