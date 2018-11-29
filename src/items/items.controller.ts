import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item';
import { CreateItemDto } from './create-item.dto';
import { AdminGuard } from '../common/admin.guard';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Post()
  @UseGuards(new AdminGuard())
  @UsePipes(new ValidationPipe())
  async create(@Body() item: CreateItemDto) {
    this.itemsService.create(item);
  }
}
