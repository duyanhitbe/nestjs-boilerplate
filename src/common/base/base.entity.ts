import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity as TypeormBaseEntity,
	UpdateDateColumn
} from 'typeorm';

@ObjectType({ isAbstract: true })
export class BaseEntity extends TypeormBaseEntity {
	/** uuid */
	@Field(() => ID, { description: 'uuid' })
	@ApiProperty({ description: 'uuid' })
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	/** Ngày tạo */
	@Field({ description: 'Ngày tạo' })
	@ApiProperty({ description: 'Ngày tạo' })
	@CreateDateColumn()
	createdAt!: Date;

	/** Lần cuối update */
	@Field({ description: 'Lần cuối update' })
	@ApiProperty({ description: 'Lần cuối update' })
	@UpdateDateColumn()
	updatedAt!: Date;

	/** Ngày xoá */
	@Field({ description: 'Ngày xoá', nullable: true })
	@ApiProperty({ description: 'Ngày xoá' })
	@DeleteDateColumn()
	deletedAt?: Date | null;

	/** Kích hoạt */
	@Field({ description: 'Kích hoạt' })
	@ApiProperty({ description: 'Kích hoạt' })
	@Column({ default: true })
	isActive!: boolean;
}
