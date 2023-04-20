import moment = require('moment-timezone');
import { DataTypes } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Table
export class Information extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataTypes.ENUM(
      'About Us',
      'FAQs/ Need Help',
      'Become a seller',
      'Store FAQs/ Need Help',
      'Order',
      'Replacement',
      'Cancellations',
      'Returns',
      'Payment',
      'Shipping',
      'Shopping'
    ),
  })
  information_type: string;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  information_description: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
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
}
