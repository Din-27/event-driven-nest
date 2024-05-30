import { Prisma, Product } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.product.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (err) {
      this.logger.error('Failed to create task', err.stack);
      throw err;
    }
  }

  findOne(
    userWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    try {
      return this.prisma.product.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (err) {
      this.logger.error('Failed to create task', err.stack);
      throw err;
    }
  }

  update(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    try {
      const { where, data } = params;
      return this.prisma.product.update({
        data,
        where,
      });
    } catch (err) {
      this.logger.error('Failed to create task', err.stack);
      throw err;
    }
  }

  remove(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    try {
      return this.prisma.product.delete({
        where,
      });
    } catch (err) {
      this.logger.error('Failed to create task', err.stack);
      throw err;
    }
  }
}
