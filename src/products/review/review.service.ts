import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entities/product.entity";
import {Repository} from "typeorm";
import {Review} from "../entities/review.entity";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
    ) {
    }
}
