import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('notifications')
  create(
    @Payload() createProductDto: CreateProductDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    // return this.productsService.create(createProductDto);
  }

  // @MessagePattern('findAllProducts')
  // findAll(@Ctx() context: RmqContext) {
  //   return this.productsService.findAll();
  // }

  // @MessagePattern('findOneProduct')
  // findOne(@Payload() id: number, @Ctx() context: RmqContext) {
  //   return this.productsService.findOne(id);
  // }

  // @MessagePattern('updateProduct')
  // update(
  //   @Payload() updateProductDto: UpdateProductDto,
  //   @Ctx() context: RmqContext,
  // ) {
  //   return this.productsService.update(updateProductDto.id, updateProductDto);
  // }

  // @MessagePattern('removeProduct')
  // remove(@Payload() id: number, @Ctx() context: RmqContext) {
  //   return this.productsService.remove(id);
  // }
}
