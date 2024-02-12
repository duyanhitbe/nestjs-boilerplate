import { UserModel } from '@apis/user/models/user.model';
import { BaseModel, Schema, createSchema } from '@common';
import { Prop } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type BookDocument = HydratedDocument<BookModel> & BaseModel;

@Schema('book')
export class BookModel extends BaseModel {
	@Prop()
	name!: string;

	@Prop({ type: MongooseSchema.Types.ObjectId })
	userId!: string;
}

export const BookSchema = createSchema(BookModel);

BookSchema.virtual('user', {
	ref: UserModel.name,
	localField: 'userId',
	foreignField: '_id',
	justOne: true
});
