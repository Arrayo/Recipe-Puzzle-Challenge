import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Recipe } from './Recipe';

@ObjectType()
@Entity('category')
export class Category extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [Recipe])
    @OneToMany(() => Recipe, recipe => recipe.cat)
    recipes: Recipe[];


    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;
}