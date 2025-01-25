import {IsInt, IsString, Min} from "class-validator";

export class ProductDto {
    @IsString({
        message: "Name has to be a string"
    })
    name: string;

    @IsString()
    description: string;

    @IsInt()
    @Min(0, { message: "stock has to be a positive number" })
    stock: number;
}
