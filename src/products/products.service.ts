import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from "./entities/product.entity";
import {ProductDto} from "./dto/product.dto";
import {ProductPatchDto} from "./dto/product-patch.dto";
import {Like, MoreThan, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Size} from "./entities/size.entity";
import {QueryProductsDto} from "./dto/query-products.dto";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Size)
        private sizeRepository: Repository<Size>

    ) { }

    findAll(query: QueryProductsDto) : Promise<Product[]> {
        console.log(query.limit);
        return this.productRepository.find({
                take: query.limit,
            where: [
                { name: Like(`%${query.query}%`) },
                { description: Like(`%${query.query}%`) }
            ],
            order: {
                    [query.order]: 'ASC' //[] is used to pass a variable as a key
            }


        });
    }

    async findById(id: number) : Promise<Product> {
        let product = await this.productRepository.findOne({where: { id }})
        if(product) {
            return product;
        }
        throw new NotFoundException(`Product with id ${id} not found`);
    }

    async addProduct(product: ProductDto): Promise<Product> {
        const sizes = await Promise.all(product.sizes.map(size => this.selectOrCreateSize(size)));
        const createdProduct = this.productRepository.create({
            ...product,
            sizes
        });
        await this.productRepository.save(createdProduct);
        return createdProduct;

    }

    async updateProduct(id: number, product: ProductDto | ProductPatchDto) : Promise<Product> {
        const sizes = product.sizes && await Promise.all(product.sizes.map(size => this.selectOrCreateSize(size)));
        let inputProduct = {
            id,
            ...product,
            sizes
        }
        const productToUpdate = await this.productRepository.preload(inputProduct);
        if (!productToUpdate)  throw new NotFoundException(`Product with id ${id} not found`);

        return this.productRepository.save(productToUpdate);
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

    private async selectOrCreateSize(size: string): Promise<Size> {
        let sizeEntity = await this.sizeRepository.findOne({ where: { size } })
        if(sizeEntity) return sizeEntity;
        return sizeEntity = this.sizeRepository.create({ size });
    }

}
