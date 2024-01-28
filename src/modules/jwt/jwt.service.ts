import { Injectable } from '@nestjs/common';
import { JwtSignOptions, JwtService as NestJwtService } from '@nestjs/jwt';
import { IJwtService } from './jwt.interface';

@Injectable()
export class JwtService extends IJwtService {
	private readonly SECRET_JWT: string;

	constructor(private readonly jwtService: NestJwtService) {
		super();
		this.SECRET_JWT = process.env.SECRET_JWT;
	}

	sign(payload: JwtPayload, options?: Omit<JwtSignOptions, 'secret'>) {
		return this.jwtService.signAsync(payload, {
			...options,
			secret: this.SECRET_JWT
		});
	}

	verify(token: string) {
		return this.jwtService.verifyAsync<JwtPayload>(token, {
			secret: this.SECRET_JWT
		});
	}
}
