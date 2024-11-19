import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 13' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Latest iPhone model' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  stock: number;
}
