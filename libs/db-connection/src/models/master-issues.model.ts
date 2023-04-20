import { DataTypes } from 'sequelize';
import { AllowNull, Column, Model, Table } from 'sequelize-typescript';
import moment = require('moment-timezone');
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';

@Table
export class Master_issues extends Model {
  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(
      'Order',
      'Replacement',
      'Cancellations',
      'Returns',
      'Payment',
      'Shipping',
      'Shopping'
    ),
  })
  issue_type: string;

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
