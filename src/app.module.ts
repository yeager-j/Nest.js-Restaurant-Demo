import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { AuthenticationMiddleware } from './common/authentication.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './items/item.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nestjs-restaurant'), MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
  controllers: [ItemsController, ShoppingCartController],
  providers: [ItemsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { path: '/items', method: RequestMethod.POST },
      { path: '/shopping-cart', method: RequestMethod.POST }
    );
  }
}
