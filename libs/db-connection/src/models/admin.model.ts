import { DataTypes } from 'sequelize';
import moment = require('moment-timezone');
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Unique,
  AllowNull,
} from 'sequelize-typescript';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Table
export class Admin extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  first_name: string;

  @AllowNull(false)
  @Column
  last_name: string;

  @AllowNull(true)
  @Column
  password: string;

  @Unique
  @AllowNull(false)
  @Column
  email_Id: string;

  @Unique
  @AllowNull(false)
  @Column
  phone_no: string;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Male', 'Female', 'Other') })
  gender: string;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  dob: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
  }

  @Column({ defaultValue: 0 })
  is_deleted: boolean;
}
