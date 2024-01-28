import { IUserService } from '@apis/user/user.interface';
import { Injectable } from '@nestjs/common';
import { BaseAuthService, IAuthService } from './auth.interface';

@Injectable()
export class AuthService extends IAuthService {
	constructor(private readonly userService: IUserService) {
		super();
	}

	getService(userType: UserType): BaseAuthService {
		const serviceMap: Record<UserType, BaseAuthService> = {
			user: this.userService
		};
		return serviceMap[userType];
	}
}
