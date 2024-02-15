import { BaseModel, Schema, createSchema } from '@common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { hash } from 'argon2';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel> & BaseModel;

@ObjectType('User')
@Schema('user')
export class UserModel extends BaseModel {
	/** Tài khoản đăng nhập */
	@Field()
	@Prop()
	username!: string;

	/** Mật khẩu */
	@Prop()
	password!: string;
}

export const UserSchema = createSchema(UserModel);

UserSchema.pre<UserDocument>('save', async function (next) {
	if (this.password) {
		this.password = await hash(this.password);
	}
	next();
});

UserSchema.index({ username: 'text' }, { weights: { username: 1 } });
