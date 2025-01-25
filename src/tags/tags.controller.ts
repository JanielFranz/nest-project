import {Controller, Get, Param} from '@nestjs/common';
import {TagsService} from "./tags.service";
import {Tag} from "./tag.interface";

@Controller('tags')
export class TagsController {
    constructor(private readonly  tagsService: TagsService) { }

    @Get()
    getAllTags() : Tag[] {
        return this.tagsService.findAllTags();
    }

    @Get(':id')
    find(@Param('id') id: number) : void {
        console.log(id, typeof id);
    }
}
