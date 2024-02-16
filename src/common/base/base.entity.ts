import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity as TypeormBaseEntity,
	UpdateDateColumn
} from 'typeorm';

export class BaseEntity extends TypeormBaseEntity {
	/** uuid */
	@ApiProperty({ description: 'uuid' })
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	/** Ngày tạo */
	@ApiProperty({ description: 'Ngày tạo' })
	@CreateDateColumn()
	createdAt!: Date;

	/** Lần cuối update */
	@ApiProperty({ description: 'Lần cuối update' })
	@UpdateDateColumn()
	updatedAt!: Date;

	/** Ngày xoá */
	@ApiProperty({ description: 'Ngày xoá' })
	@DeleteDateColumn()
	deletedAt?: Date | null;

	/** Kích hoạt */
	@ApiProperty({ description: 'Kích hoạt' })
	@Column({ default: true })
	isActive!: boolean;
}
