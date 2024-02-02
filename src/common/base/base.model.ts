import { Type, applyDecorators } from '@nestjs/common';
import { Schema as NestMongooseSchema, Prop, SchemaFactory } from '@nestjs/mongoose';

export class BaseModel {
	/** ObjectId */
	id!: string;

	/** Ngày tạo */
	@Prop()
	createdAt!: Date;

	/** Lần cuối update */
	@Prop()
	updatedAt!: Date;

	/** Ngày xoá */
	@Prop({ default: null })
	deletedAt?: Date;

	/** Kích hoạt */
	@Prop({ default: true })
	isActive!: boolean;
}

export const Schema = () =>
	applyDecorators(NestMongooseSchema({ timestamps: true, versionKey: false }));

export const createSchema = (target: Type<BaseModel>) => {
	const schema = SchemaFactory.createForClass(target);
	schema.set('toJSON', {
		virtuals: true
	});
	schema.set('toObject', {
		virtuals: true
	});
	schema.virtual('id').get(function () {
		return this._id.toString();
	});
	return schema;
};
