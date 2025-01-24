import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param, ParseIntPipe,
    Post,
    Put,
    Res
} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {Product} from "./product.interface";

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }
    @Get()
    getAllProducts() : Product[] {
        return this.productsService.findAll();
    }

    @Get(':id')
    getProductById(@Param('id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
                       id:number): Product {
        return this.productsService.findById(id);
    }

    @Post()
    createProduct(@Body() body: any): Product {
        return this.productsService.addProduct(body);
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() body: any) : Product {
        return this.productsService.updateProduct(id, body);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: number): string {
        this.productsService.deleteProduct(id);
        return 'Product deleted';
    }
}
