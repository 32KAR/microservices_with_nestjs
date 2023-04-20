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
  HasMany,
} from 'sequelize-typescript';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wishlist } from './wishlist.model';
import { Support } from './support.model';
import { Product } from './product.model';
import { Order } from './order.model';
import { Store } from './store.model';

@Table
export class User extends Model {
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

  @Unique
  @AllowNull(false)
  @Column
  email_id: string;

  @AllowNull(true)
  @Column
  password: string;

  @Unique
  @AllowNull(false)
  @Column
  phone_no: string;

  @AllowNull(true)
  @Column({ type: DataTypes.ENUM('Male', 'Female', 'Other') })
  gender: string;

  @AllowNull(true)
  @Column({ type: DataTypes.DATEONLY })
  dob: Date;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM('Customer', 'Vendor') })
  role: string;

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

  @HasMany(() => Wishlist, { foreignKey: 'user_id' })
  wishlist: Wishlist;

  @HasMany(() => Support, { foreignKey: 'user_id' })
  support: Support;

  @HasMany(() => Store, { foreignKey: 'user_id' })
  store: Store;

  @HasMany(() => Product, { foreignKey: 'user_id' })
  product: Product;
  
  @HasMany(() => Order, { foreignKey: 'user_id' })
  order: Order;
}
