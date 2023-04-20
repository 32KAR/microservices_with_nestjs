import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import  moment = require('moment-timezone');
import { DataTypes } from 'sequelize';
import { Store } from './store.model';
import { Sub_category } from './sub_category.model';

@Table
export class Banner extends Model {

  @ForeignKey(() => Store)  
  @AllowNull(false)
  @Column
  store_id: number;

  @AllowNull(true)
  @Column
  image: string;

  @ForeignKey(() => Sub_category) 
  @AllowNull(false)
  @Column
  sub_category_id: number;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Sale', 'Upcoming Launches', 'New Launches')})
  related_to: string;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Home Page', 'Product Page')})
  display_at: string;

  @AllowNull(true)
  @Column
  is_slider: boolean;

  @AllowNull(true)
  @Column
  sort_order: number;

  @AllowNull(true)
  @Column
  is_Display: boolean;

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
  store: Store;

  @BelongsTo(() => Sub_category)
  sub_category: Sub_category;
}
