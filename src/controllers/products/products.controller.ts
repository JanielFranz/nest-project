import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Res
} from '@nestjs/common';

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
    getProductById(@Res() response, @Param('id') id:number): string {
        if(id < 100) {
            return response.status(HttpStatus.OK).send(`This is the product with id ${id}`);
        } else {
            return response.status(HttpStatus.NOT_FOUND).send('The product does not exist');
        }

    }

    // @Post()
    // createProduct(@Body() body): string {
    //     return `Your product is ${body.name} and the description is
    //     ${body.description}`;
    // }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
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
        throw new BadRequestException('You cannot delete the product');
        return 'Product has been deleted';
    }
}
