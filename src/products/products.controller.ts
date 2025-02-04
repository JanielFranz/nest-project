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
    Put, Query,
    Res, UsePipes, ValidationPipe
} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {Product} from "./entities/product.entity";
import {ProductDto} from "./dto/product.dto";
import {ProductPatchDto} from "./dto/product-patch.dto";

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }
    @Get()
    getAllProducts(@Query('limit', ParseIntPipe) limit: number): Promise<Product[]> {
        console.log(limit)
        return this.productsService.findAll(limit);
    }

    @Get(':id')
    getProductById(@Param('id',
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
                       id:number): Promise<Product> {
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
    async deleteProduct(@Param('id') id: number): Promise<void> {
        return await this.productsService.deleteProduct(id);
    }

    @Patch(':id')
    async patchProduct(@Param('id') id: number, @Body() body: ProductPatchDto) : Promise<Product> {
        return await this.productsService.updateProduct(id, body);
    }
}
