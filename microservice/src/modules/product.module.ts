import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { PrismaModule } from '../config/prisma/prisma.module';
import { ProductsService } from './product.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
