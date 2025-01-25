import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param, ParseIntPipe, Patch,
    Post,
    Put,
    Res, UsePipes, ValidationPipe
} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {Product} from "./product.interface";
import {ProductDto} from "./dto/product.dto";
import {ProductPatchDto} from "./dto/product-patch.dto";

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
    @UsePipes(new ValidationPipe())
    async createProduct(@Body() body: ProductDto): Promise<Product> {
        return this.productsService.addProduct(body);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: number,
                  @Body() body: ProductDto
    ) : Promise<Product> {
        console.log(body)
        return this.productsService.updateProduct(id, body);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteProduct(@Param('id') id: number): string {
        this.productsService.deleteProduct(id);
        return 'Product deleted';
    }

    @Patch(':id')
    patchProduct(@Param('id') id: number, @Body() body: ProductPatchDto): Product {
        return this.productsService.patch(id, body);
    }
}
