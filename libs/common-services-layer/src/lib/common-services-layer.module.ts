import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../services/auth/strategy/jwt.strategy';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: 'JWTSecretKey',
    //   signOptions: { expiresIn: '24h' },
    // }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonServicesLayerModule {}
