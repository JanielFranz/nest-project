import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./products/entities/product.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),
      ProductsModule,
      TagsModule,
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DATABASE'),
          // entities: [Product]
          autoLoadEntities: true,
          synchronize: true
        })
      })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
