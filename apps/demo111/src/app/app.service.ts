import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@my-workspace/db-connection';

@Injectable()
export class AppService {
  public constructor(@InjectModel(User) private userModel: typeof User) {}

  sendSMS() {
    return 'Welcome to demo111';
  }

  async getDataFromUser() {
    let error: any = null;
    const findAllData: any = await this.userModel
      .findAll()
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return `Failed to list data.`;
    }

    return {
      data: findAllData,
    };
  }
}
