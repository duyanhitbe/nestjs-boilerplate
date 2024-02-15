import { UserModel } from '@apis/user/models/user.model';
import { BaseModel, Schema, createSchema } from '@common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type BookDocument = HydratedDocument<BookModel> & BaseModel;

@ObjectType('Book')
@Schema('book')
export class BookModel extends BaseModel {
	@Field()
	@Prop()
	name!: string;

	@Field()
	@Prop({ type: MongooseSchema.Types.ObjectId })
	userId!: string;

	@Field(() => UserModel, { nullable: true })
	user?: UserModel;
}

export const BookSchema = createSchema(BookModel);

BookSchema.virtual('user', {
	ref: UserModel.name,
	localField: 'userId',
	foreignField: '_id',
	justOne: true
});
