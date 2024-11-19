import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ApiHeader, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('products')
@ApiHeader({
  name: 'x-api-key',
  description: 'API key for authentication',
})
@UseGuards(ApiKeyGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll() {
    return this.productsService.findAll();
  }
}
