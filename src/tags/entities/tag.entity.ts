import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50})
    name: string;

    @Column('varchar', { length: 50})
    slug: string;
}
