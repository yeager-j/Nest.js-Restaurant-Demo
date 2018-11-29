import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { AuthenticationMiddleware } from './common/authentication.middleware';

@Module({
  imports: [],
  controllers: [ItemsController, ShoppingCartController],
  providers: [ItemsService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { path: '/items', method: RequestMethod.POST },
      { path: '/shopping-cart', method: RequestMethod.POST }
    );
  }
}
