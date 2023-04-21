import { Module } from '@nestjs/common';
import { Admin, Otp, Store, User } from '@my-workspace/db-connection';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, Otp, User, Store]),
    JwtModule.register({
      secret: 'JWTSecretKey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
