import moment = require('moment');
import { TwilioService } from 'nestjs-twilio';

export async function OtpServices(
  twilioService: TwilioService,
  phone_no: string
) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const generateOtp = await twilioService.client.messages.create({
    body: `Your OTP is ${otp}`,
    to: phone_no,
    from: process.env.SENDER_SID,
  });
  const endDate = moment().add(1, 'minutes').format();
  return { generateOtp, otp, endDate };
}
