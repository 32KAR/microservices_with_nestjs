import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConnectionModule } from '@my-workspace/db-connection';
import { CommonServicesLayerModule } from '@my-workspace/common-services-layer';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    DbConnectionModule,
    CommonServicesLayerModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
