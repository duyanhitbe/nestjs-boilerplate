import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { verify } from 'argon2';
import { Model } from 'mongoose';
import { UserModel } from './models/user.model';
import { IUserService } from './user.interface';

@Injectable()
export class UserService extends IUserService {
	notFoundMessage = 'Không tìm thấy User';

	constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
		super(userModel);
	}

	async validateUserByUsernamePassword(username: string, password: string): Promise<UserModel> {
		const user = await this.getOne({ where: { username } });
		if (!user) {
			throw new UnauthorizedException('Không tìm thấy user');
		}
		const comparePassword = await verify(user.password, password);
		if (!comparePassword) {
			throw new UnauthorizedException('Sai mật khẩu');
		}
		return user;
	}

	async validateUserById(id: string): Promise<UserModel> {
		return this.getOneByIdOrFail(id);
	}
}
