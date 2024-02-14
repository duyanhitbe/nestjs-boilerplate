import { UserEntity } from '@apis/user/entities/user.entity';
import { BaseEntity } from '@common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@ObjectType('Book')
@Entity({ name: 'book' })
export class BookEntity extends BaseEntity {
	/** Name */
	@Field()
	@Column()
	name!: string;

	/** User's id */
	@Field()
	@Column()
	userId!: string;

	@Field(() => UserEntity, { nullable: true })
	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'userId' })
	user?: User;
}
