import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from "./entities/product.entity";
import {ProductDto} from "./dto/product.dto";
import {ProductPatchDto} from "./dto/product-patch.dto";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>

    ) { }

    findAll() : Promise<Product[]> {
        return this.productRepository.find();
    }

    async findById(id: number) : Promise<Product> {
        let product = await this.productRepository.findOne({where: { id }})
        if(product) {
            return product;
        }
        throw new NotFoundException(`Product with id ${id} not found`);
    }

    async addProduct(product: ProductDto): Promise<Product> {
        const createdProduct = this.productRepository.create(product);
        await this.productRepository.save(createdProduct);
        return createdProduct;

    }

    async updateProduct(id: number, product: ProductDto | ProductPatchDto) : Promise<Product> {
        let inputProduct = {
            id,
            ...product
        }
        const productToUpdate
            = await this.productRepository.preload(inputProduct);

        if(productToUpdate) {
            return this.productRepository.save(productToUpdate);
        }
        throw new NotFoundException(`Product with id ${id} not found`);

    }

    async deleteProduct(id: number) : Promise<void> {
        const product = await this.productRepository
            .findOne({ where: { id }});
        if(product) {
            await this.productRepository.remove(product);
            return;
        }
        throw new NotFoundException(`Product with id ${id} not found`);
    }

}
