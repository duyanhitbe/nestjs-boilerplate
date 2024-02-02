import { applyDecorators } from '@nestjs/common';
import { Schema as NestMongooseSchema, Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class BaseModel {
	/** ObjectId */
	@ApiProperty({ description: 'ObjectId' })
	@Prop()
	id!: string;

	/** Ngày tạo */
	@ApiProperty({ description: 'Ngày tạo' })
	@Prop()
	createdAt!: Date;

	/** Lần cuối update */
	@ApiProperty({ description: 'Lần cuối update' })
	@Prop()
	updatedAt!: Date;

	/** Ngày xoá */
	@ApiProperty({ description: 'Ngày xoá' })
	@Prop()
	deletedAt!: Date;

	/** Kích hoạt */
	@ApiProperty({ description: 'Kích hoạt' })
	@Prop()
	isActive!: boolean;
}

export const Schema = () =>
	applyDecorators(NestMongooseSchema({ timestamps: true, versionKey: false }));
