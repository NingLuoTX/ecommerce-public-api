import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products = [];

  create(createProductDto: CreateProductDto) {
    const product = {
      id: this.products.length + 1,
      ...createProductDto,
    };
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }
}
