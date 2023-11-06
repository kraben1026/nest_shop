import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDocument } from "./product.schema";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() productDto: createProductDto
  ): Promise<ProductDocument> {
    return this.productService.create(
      productDto.name,
      productDto.price,
      productDto.description
    );
  }

  @Get()
  async findProduct(): Promise<ProductDocument[]> {
    return this.productService.findAll();
  }

  @Get(":id")
  async findProductById(@Param("id") id: string): Promise<ProductDocument> {
    return this.productService.findById(id);
  }

  @Patch(":id")
  async updateProduct(
    @Body() updateProductDto: updateProductDto
  ): Promise<ProductDocument> {
    return this.productService.updateProduct(
      updateProductDto._id,
      updateProductDto.name,
      updateProductDto.price,
      updateProductDto.description
    );
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string): Promise<ProductDocument> {
    return await this.productService.deleteProduct(id);
  }
}
