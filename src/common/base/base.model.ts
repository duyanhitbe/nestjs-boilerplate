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
	@Prop({ type: Date, default: null })
	deletedAt?: Date | null;

	/** Kích hoạt */
	@Prop({ default: true })
	isActive!: boolean;
}

export const Schema = (collection?: string) =>
	applyDecorators(NestMongooseSchema({ timestamps: true, versionKey: false, collection }));

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
