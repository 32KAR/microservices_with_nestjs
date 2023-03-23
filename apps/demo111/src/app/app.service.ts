import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class AppService {
  public constructor(private readonly twilioService: TwilioService) {}

  sendSMS() {
    return this.twilioService.client.messages.create({
      body: 'OTP 123456',
      messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
      to: process.env.TARGET_PHONE_NUMBER,
    });
  }
}
