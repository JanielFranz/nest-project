import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from "./entities/product.entity";
import {ProductDto} from "./dto/product.dto";
import {ProductPatchDto} from "./dto/product-patch.dto";

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'First product',
            description: 'This is the description of the first product',
            stock: 0
        },
        {
            id: 2,
            name: 'Second product',
            description: 'This is the description of the second product',
            stock: 12
        }
    ];

    findAll() : Product[] {
        return this.products;
    }

    findById(id: number) : Product {
        console.log(typeof id);
        let product = this.products.find((product) => product.id == id);
        if(product) return product;
        throw new NotFoundException(`Product with id ${id} not found`);
    }

    addProduct(product: ProductDto): Product {
        this.products = [
            ...this.products,
            {
                id: this.lookUpLastId() + 1,
                name: product.name,
                description: product.description,
                stock: product.stock
            }
        ]

        return this.findById(this.lookUpLastId());
    }

    updateProduct(id: number, product: ProductDto) : Product {
        let updatedProduct : Product = {
            id,
            name: product.name,
            description: product.description,
            stock: product.stock
        }
        return this.updatedObject(id, updatedProduct);
    }

    deleteProduct(id: number) : void {
        this.products = this.products.filter((item) => item.id != id);
    }

    patch(id: number, product: ProductPatchDto):  Product {
        const productToUpdate = this.findById(id);
        const updatedProduct = {
            ...productToUpdate,
            ...product
        }

        return this.updatedObject(id, updatedProduct);
    }

    private lookUpLastId(): number {
        return this.products[this.products.length -1].id;
    }

    private updatedObject(id: number, product: Product) : Product {
        this.products = this.products.map((item) => {
            return item.id == id ? product : item;
        })
        return this.findById(id);
    }
}
