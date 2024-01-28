import { AuthStrategy } from '@apis/auth/auth.const';
import { IAuthService } from '@apis/auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, AuthStrategy.USER_JWT) {
	constructor(private readonly authService: IAuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_JWT
		});
	}

	async validate(payload: UserJwtPayload) {
		const { id } = payload;
		const service = this.authService.getService('user');
		return service.validateUserById(id);
	}
}
