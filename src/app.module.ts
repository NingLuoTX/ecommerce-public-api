import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    ApiKeysModule,
    HealthModule,
  ],
})
export class AppModule {}
