import {IsInt, IsString, Length, Min} from "class-validator";

export class ProductDto {
    @IsString({
        message: "Name has to be a string"
    })
    name: string;

    @IsString()
    @Length(10, 50)
    description: string;

    @IsInt()
    @Min(0, { message: "stock has to be a positive number" })
    stock: number;
}
