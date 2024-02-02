import { BaseModel, Schema, createSchema } from '@common';
import { Prop } from '@nestjs/mongoose';
import { hash } from 'argon2';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel> & BaseModel;

@Schema()
export class UserModel extends BaseModel {
	/** Tài khoản đăng nhập */
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
