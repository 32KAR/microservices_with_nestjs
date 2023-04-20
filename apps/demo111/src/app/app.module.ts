import { Module } from '@nestjs/common';
import { TwilioModule } from 'nestjs-twilio';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConnectionModule, User } from '@my-workspace/db-connection';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    DbConnectionModule,
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
