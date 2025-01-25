import { Injectable } from '@nestjs/common';
import {Tag} from "./entities/tag.entity";

@Injectable()
export class TagsService {
    private tags : Tag[] = [
        {
            id: 1,
            name: "furniture",
            slug: "furniture"
        },
        {
            id: 2,
            name: "Clothes",
            slug: "clothes"
        },
        {
            id: 3,
            name: "Electronics",
            slug: "electronics"
        }
    ]

    findAllTags(): Tag[] {
        return this.tags;
    }


}
