import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entities/product.entity";
import {Repository} from "typeorm";
import {Review} from "../entities/review.entity";
import {ReviewDto} from "../dto/review.dto";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
    ) { }

    async addReview(id: number, body: ReviewDto) {
        const product = await this.productRepository
            .findOne({ where: { id } });
        if(!product) throw new NotFoundException(`Product with id ${id} not found`);

        const review = this.reviewRepository.create(body);
        review.product = product

        return await this.reviewRepository.save(review);

    }
}
