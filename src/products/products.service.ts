import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from "./product.interface";

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'First product',
            description: 'This is the description of the first product',
        },
        {
            id: 2,
            name: 'Second product',
            description: 'This is the description of the second product',
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

    addProduct(product: any): Product {
        this.products = [
            ...this.products,
            {
                id: this.lookUpLastId() + 1,
                name: product.name,
                description: product.description
            }
        ]

        return this.findById(this.lookUpLastId());
    }

    updateProduct(id: number, product: any) : Product {
        let updatedProduct : Product = {
            id,
            name: product.name,
            description: product.description
        }
        this.products = this.products.map((item) => {
            return item.id == id ? updatedProduct : item;
        })

        return this.findById(id);
    }

    deleteProduct(id: number) : void {
        this.products = this.products.filter((item) => item.id != id);
    }

    private lookUpLastId(): number {
        return this.products[this.products.length -1].id;
    }
}
