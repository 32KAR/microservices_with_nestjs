import { DataTypes } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
import { City } from './city.model';
import { Country } from './country.model';
import { State } from './state.model';
import { User } from './users.model';
import moment = require('moment-timezone');

@Table
export class Address extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;

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
  @Column({ type: DataTypes.ENUM('Home', 'Work', 'Other') })
  type: string;

  @AllowNull(true)
  @Column
  open_on_saturday: boolean;

  @AllowNull(true)
  @Column
  open_on_sunday: boolean;

  @AllowNull(true)
  @Column({ defaultValue: 0 })
  is_default: boolean;

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

  @BelongsTo(() => City)
  city: City;

  @BelongsTo(() => State)
  state: State;

  @BelongsTo(() => Country)
  country: Country;

  @BelongsTo(() => User)
  user: User;
}