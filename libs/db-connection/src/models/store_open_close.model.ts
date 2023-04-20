import moment = require('moment');
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
import { Store } from './store.model';
import { DataTypes } from 'sequelize';

@Table({
    indexes: [
    {
        unique: true,
        fields: ['store_id', 'day']
    }
    ]
})
export class Store_open_close extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Store)
  @AllowNull(false)
  @Column
  store_id: number;

  @AllowNull(false)
  @Column
  day: string;

  @AllowNull(true)
  @Column({ type: DataTypes.TIME })
  opening_time: Date;

  @AllowNull(true)
  @Column({ type: DataTypes.TIME })
  closing_time: Date;

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

  @BelongsTo(() => Store)
  category: Store;
}
