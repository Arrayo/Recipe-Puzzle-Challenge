import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, UpdateDateColumn, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';
import { Category } from './Category';

@ObjectType()
@Entity('recipes')
export class Recipe extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    ingredients: string;

    @Field(() => User)
    @Column()
    author: number;
    @ManyToOne(() => User, user => user.recipes)
    @JoinColumn({ name: 'author' })
    @JoinTable()
    user: User;

    @Field(() => Category)
    @Column()
    category: number;
    @ManyToOne(() => Category, category => category.recipes)
    @JoinColumn({ name: 'category' })
    @JoinTable()
    cat: Category;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: string;
}
