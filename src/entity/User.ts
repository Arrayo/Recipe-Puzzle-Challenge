import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Recipe } from './Recipe';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Field(() => [Recipe])
    @OneToMany(() => Recipe, recipe => recipe.user)
    recipes: Recipe[];
}
