import { Type, applyDecorators } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as NestMongooseSchema, Prop, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ isAbstract: true })
export class BaseModel {
	/** ObjectId */
	@Field(() => ID)
	id!: string;

	/** Ngày tạo */
	@Field(() => Date)
	@Prop()
	createdAt!: Date;

	/** Lần cuối update */
	@Field(() => Date)
	@Prop()
	updatedAt!: Date;

	/** Ngày xoá */
	@Field(() => Date, { nullable: true })
	@Prop({ type: Date, default: null })
	deletedAt?: Date | null;

	/** Kích hoạt */
	@Field(() => Boolean)
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
