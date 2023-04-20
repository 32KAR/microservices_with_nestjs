import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Country } from './country.model';
import moment = require('moment-timezone');
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';

@Table
export class State extends Model {
  @ForeignKey(() => Country)
  @AllowNull(false)
  @Column
  country_id: number;

  @AllowNull(false)
  @Column
  state_name: string;

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

  @Column({ defaultValue: 0 })
  is_deleted: boolean;

  @BelongsTo(() => Country)
  country: Country;
}
