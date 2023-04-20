import moment = require('moment-timezone');
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Inventory } from './inventory.model';
import { Product_image } from './product_image.model';
import { DataTypes } from 'sequelize';
import { Offer } from './offer.model';
import { Wishlist } from './wishlist.model';
import { Category } from './category.model';
import { Sub_category } from './sub_category.model';
import { User } from './users.model';
import { Store } from './store.model';
import { Feedback } from './feedback.model';

@Table
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Sub_category)
  @AllowNull(false)
  @Column
  sub_category_id: number;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column
  category_id: number;

  @ForeignKey(() => Store)
  @AllowNull(false)
  @Column
  store_id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;

  @AllowNull(false)
  @Column
  product_name: string;

  @AllowNull(false)
  @Column
  brand: string;

  @AllowNull(false)
  @Column({ type: DataTypes.FLOAT })
  product_price: number;

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

  @HasMany(() => Wishlist, { foreignKey: 'product_id' })
  wishlist: Wishlist;

  @HasMany(() => Inventory, { foreignKey: 'product_id' })
  inventory: Inventory;

  @HasMany(() => Product_image, { foreignKey: 'product_id' })
  productImage: Product_image;

  @HasMany(() => Feedback, { foreignKey: 'product_id' })
  feedback: Feedback;

  @HasMany(() => Offer, { foreignKey: 'product_id' })
  offer: Offer;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Sub_category)
  subCategory: Sub_category;

  @BelongsTo(() => Store)
  store: Store;
}
