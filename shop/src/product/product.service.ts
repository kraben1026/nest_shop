import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) {}

    async create(name: string, price: number, description: string): Promise<ProductDocument>{
        const newProduct = new this.productModel({name, price, description});
        return newProduct.save();
    }

    async findAll(): Promise<ProductDocument[]>{
        return this.productModel.find().exec();
    }


    async findById(id: string){
        try {
            return await this.productModel.findById(id);
        } catch (e) {
            return e;
        }
    }

    async updateProduct(id: string, newName: string, newPrice: number, newDescription: string): Promise<ProductDocument>{
        try {
            const product = await this.productModel.findById(id);

            product.name = newName  ?? product.name;
            product.price = newPrice ?? product.price;
            product.description = newDescription ?? product.description;

            return product.save();
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id: string): Promise<any>{
        try {
            return await this.productModel.deleteOne({_id: id});
        } catch (error) {
            return error;
        }
    }
}
