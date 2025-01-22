import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    getAllProducts() : string {
        return 'This is the product';
    }

    @Get(':id/:category')
    getProductByIdAndCategory(@Param() params): string {
        return `This is the product with id ${params.id} and the
        category is ${params.category}`;
    }

    @Get(':id')
    getProductById(@Param('id') id:number): string {
        return `This is the product with id ${id}`;
    }

    // @Post()
    // createProduct(@Body() body): string {
    //     return `Your product is ${body.name} and the description is
    //     ${body.description}`;
    // }

    @Post()
    createProduct(@Body('name') name: string
                  , @Body('description') description: string): string {
        return `Your product is ${name} and the description is 
        ${description}`;
    }

    @Put(':id')
    updateProduct(@Param('id') id: number,
                  @Body('name') name: string,
                  @Body('description') description: string) :string {
        return `Product with id ${id} has been updated wit the data
        ${name} and ${description}`;
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number): string {
        return 'Product has been deleted';
    }
}
