import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './product.service';
import { Prisma, Product } from '@prisma/client';

interface Response<T> {
  message: string;
  data?: T;
}

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('create_product')
  createTask(
    data: Prisma.ProductCreateInput,
  ): Response<Prisma.ProductCreateInput> {
    console.log(data);
    this.productsService.create(data);
    return { message: 'Product created.', ...data };
  }

  @MessagePattern('get_all_products')
  async getAllTasks(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @MessagePattern('get_product')
  getTask(id: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @MessagePattern('update_product')
  updateTask(data: {
    id: Prisma.ProductWhereUniqueInput;
    data_product: Prisma.ProductUpdateInput;
  }): Response<Product> {
    this.productsService.update({
      where: data.id,
      data: data.data_product,
    });
    return { message: 'Product updated.', ...data };
  }

  @MessagePattern('delete_product')
  deleteTask(
    id: Prisma.ProductWhereUniqueInput,
  ): Response<Prisma.ProductWhereUniqueInput> {
    this.productsService.remove(id);
    return { message: 'Delete success.', data: id };
  }
}
