import {IsString} from "class-validator";

export class TagsDto {
    @IsString({
        message: 'You have to indicate the name'
    })
    name: string;

    @IsString()
    slug: string;
}
