import { Controller, Post } from '@nestjs/common';

@Controller('shopping-cart')
export class ShoppingCartController {
  @Post()
  async addItem() {
    return 'Added';
  }
}
