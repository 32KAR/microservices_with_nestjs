import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin, Otp, Store, User } from '@my-workspace/db-connection';
import {
  HandleResponse,
  Messages,
} from '@my-workspace/common-services-layer';
import moment from 'moment';
import { registrationDto } from './dto/registration.dto';
import { StoreRegistrationDto } from './dto/storeRegistration.dto';
import { sendOtpDto } from './dto/sendOtp.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Otp) private otpModel: typeof Otp,
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Store) private storeModel: typeof Store,
  ) {}

  async sendOtpRegistration(dto: sendOtpDto) {
    let error = null;
    const generateOtp = Math.floor(100000 + Math.random() * 900000);
    const { phone_no } = dto;

    const userData: any = await this.userModel
      .findOne({ where: { phone_no } })
      .catch((err) => {
        error = err;
      });

    const adminData: any = await this.adminModel
      .findOne({ where: { phone_no } })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} send otp.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (userData || adminData) {
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        `Your phone number is ${Messages.ALREADY_REGISTERED}`,
        undefined,
        undefined
      );
    } else {
      const endDate = moment().add(5, 'minute').format();
      const otpData = {
        otp: generateOtp,
        expiration_time: endDate,
        phone_no,
      };

      const createOtp = await this.otpModel.create(otpData).catch((err) => {
        error = err;
      });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} send otp.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          }
        );
      }

      if (createOtp && Object.keys(createOtp).length > 0) {
        return HandleResponse(
          HttpStatus.OK,
          Messages.OTP_SENT,
          { otp: generateOtp },
          undefined
        );
      }
    }
  }

  async registration(dto: registrationDto) {
    let error = null;
    const { otp, phone_no, first_name, last_name, role, email_id } = dto;

    const userStoredData: any = await this.userModel
      .findOne({
        where: { phone_no },
      })
      .catch((err: any) => {
        error = err;
      });

    const adminStoredData: any = await this.adminModel
      .findOne({
        where: { phone_no },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        `${Messages.FAILED_TO} find user or admin data.`,
        undefined,
        undefined
      );
    }

    if (userStoredData || adminStoredData) {
      return HandleResponse(
        HttpStatus.BAD_REQUEST,
        `Your phone number is ${Messages.ALREADY_REGISTERED}`,
        undefined,
        undefined
      );
    } else {
      const findOtp = await this.otpModel
        .findOne({ where: { otp, phone_no: phone_no } })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} find otp.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          }
        );
      }

      if (findOtp && Object.keys(findOtp).length > 0) {
        const currentTime = moment().format('x');
        const otpValidTime = moment(findOtp.expiration_time).format('x');
        if (otpValidTime > currentTime) {
          await this.otpModel
            .destroy({ where: { phone_no } })
            .catch((err) => {
              error = err;
            });

          if (error) {
            return HandleResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              `${Messages.FAILED_TO} verify otp.`,
              undefined,
              {
                errorMessage: error.original.sqlMessage,
                field: error.fields,
              }
            );
          }

          const registerData: any = await this.userModel
            .create({ first_name, last_name, phone_no, role, email_id })
            .catch((err) => {
              error = err;
            });

          if (error) {
            return HandleResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              `${Messages.FAILED_TO} register ${role}.`,
              undefined,
              {
                errorMessage: error.original.sqlMessage,
                field: error.fields,
              }
            );
          }

          if (registerData && Object.keys(registerData).length > 0) {
            return HandleResponse(
              HttpStatus.OK,
              `Congratulation! You are ${Messages.REGISTERED_SUCCESS}!!!`,
              registerData.dataValues.id,
              undefined
            );
          }
        } else {
          await this.otpModel.destroy({ where: { otp } }).catch((err) => {
            error = err;
          });

          if (error) {
            return HandleResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              `${Messages.FAILED_TO} verify otp.`,
              undefined,
              {
                errorMessage: error.original.sqlMessage,
                field: error.fields,
              }
            );
          }

          return HandleResponse(
            HttpStatus.BAD_REQUEST,
            Messages.OTP_EXPIRED,
            undefined,
            undefined
          );
        }
      } else {
        return HandleResponse(
          HttpStatus.BAD_REQUEST,
          `Otp ${Messages.DOES_NOT_MATCH}.`,
          undefined,
          undefined
        );
      }
    }
  }

  async storeRegistration(dto: StoreRegistrationDto) {
    let error = null;

    const userStoredData: any = await this.userModel
      .findOne({
        where: { id: dto.user_id },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} find vendor data.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (userStoredData.dataValues.role === 'Vendor') {
      const addStoreDetails: any = await this.storeModel
        .create({
          ...dto,
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} add store.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          }
        );
      }

      if (addStoreDetails && Object.keys(addStoreDetails).length > 0) {
        return HandleResponse(
          HttpStatus.OK,
          `Store is ${Messages.ADD_SUCCESS}`,
          undefined,
          undefined
        );
      }
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        `Vendor ${Messages.DOES_NOT_EXIST}.`,
        undefined,
        undefined
      );
    }
  }
}
