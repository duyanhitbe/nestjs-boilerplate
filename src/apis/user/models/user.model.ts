import { BaseModel, Schema } from '@common';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel> & BaseModel;

@Schema()
export class UserModel extends BaseModel {
	/** Tài khoản đăng nhập */
	@Prop()
	username!: string;

	/** Mật khẩu */
	@ApiHideProperty()
	@Prop()
	@Exclude()
	password!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.pre<UserDocument>('save', async function (next) {
	if (this.password) {
		this.password = await hash(this.password);
	}
	next();
});
