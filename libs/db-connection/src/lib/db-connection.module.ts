import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Banner } from '../models/banner.model';
import { Sub_category } from '../models/sub_category.model';
import { Store } from '../models/store.model';
import { Admin } from '../models/admin.model';
import { Otp } from '../models/otp.model';
import { Product } from '../models/product.model';
import { User } from '../models/users.model';
import { Address } from '../models/address.model';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { State } from '../models/state.model';
import { Inventory } from '../models/inventory.model';
import { Product_image } from '../models/product_image.model';
import { Offer } from '../models/offer.model';
import { Wishlist } from '../models/wishlist.model';
import { Support } from '../models/support.model';
import { Master_issues } from '../models/master-issues.model';
import { deliveryContact } from '../models/deliveryContactDetail.model';
import { Coupon } from '../models/coupon.model';
import { Category } from '../models/category.model';
import { Feedback } from '../models/feedback.model';
import { GST } from '../models/gst.model';
import { Order } from '../models/order.model';
import { Order_History } from '../models/orderHistory.model';
import { Order_Product } from '../models/orderProduct.model';
import { Bank_details } from '../models/bank_details.model';
import { Product_details } from '../models/product_details.model';
import { Cart } from '../models/cart.model';
import { Apply_Coupon } from '../models/apply-coupon.model';
import { Store_open_close } from '../models/store_open_close.model';
import { Commission } from '../models/commission.model';
import { Charges_of_commission } from '../models/chargesOfCommission.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'b8vjnzsqxksvdf2pn3ty-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'u2kcdzwuj06kmzdd',
      password: 'dfFi3BjhngAxElbNCG6j',
      database: 'b8vjnzsqxksvdf2pn3ty',
      autoLoadModels: true,
      synchronize: true,
      timezone: '+05:30',
      models: [
        Banner,
        Store,
        Sub_category,
        Admin,
        Otp,
        User,
        Address,
        City,
        Country,
        State,
        deliveryContact,
        Coupon,
        Category,
        Product,
        Inventory,
        Product_image,
        Offer,
        Wishlist,
        Support,
        Master_issues,
        Feedback,
        GST,
        Order,
        Order_Product, 
        Order_History,
        Bank_details,
        Product_details,
        Cart,
        Apply_Coupon,
        Store_open_close,
        Commission,
        Charges_of_commission,
      ],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DbConnectionModule {}
