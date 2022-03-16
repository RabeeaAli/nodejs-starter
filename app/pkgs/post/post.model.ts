import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    created_at: Date;
}