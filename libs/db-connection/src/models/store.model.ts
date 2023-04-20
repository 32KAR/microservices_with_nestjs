import moment = require('moment-timezone');
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { BeforeInsert, CreateDateColumn, BeforeUpdate } from 'typeorm';
import { City } from './city.model';
import { Country } from './country.model';
import { State } from './state.model';
import { User } from './users.model';

@Table
export class Store extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;

  @AllowNull(false)
  @Column
  store_name: string;

  @AllowNull(false)
  @Column
  address_line_1: string;

  @AllowNull(true)
  @Column
  address_line_2: string;

  @AllowNull(true)
  @Column
  landmark: string;

  @ForeignKey(() => City)
  @AllowNull(false)
  @Column
  city_id: number;

  @ForeignKey(() => State)
  @AllowNull(false)
  @Column
  state_id: number;

  @ForeignKey(() => Country)
  @AllowNull(false)
  @Column
  country_id: number;

  @AllowNull(false)
  @Column
  pin_code: number;

  @AllowNull(false)
  @Column
  GSTIN: string;

  @Unique
  @AllowNull(false)
  @Column
  phone_no: string;

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

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => City)
  city: City;

  @BelongsTo(() => State)
  state: State;

  @BelongsTo(() => Country)
  country: Country;
}
