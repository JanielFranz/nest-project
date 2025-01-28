import {IsInt, IsString, Length, Max, Min} from "class-validator";

export class ReviewDto {
    @IsString({ message: 'You must enter a user name' })
    userName: string;

    @IsString({ message: 'You must enter a valid review' })
    @Length(10, 250)
    review: string;

    @IsInt({ message: 'You must enter a valid rating' })
    @Min(1, { message: 'The minimum rating is 0' })
    @Max(5, { message: 'The maximum rating is 5' })
    rating: number;
}
