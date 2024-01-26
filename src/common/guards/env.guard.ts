import { MetadataKey } from '@common';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class EnvGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const allowedEnv = this.reflector.getAllAndOverride<string[]>(MetadataKey.ALLOWED_ENV, [
			context.getHandler(),
			context.getClass()
		]);
		const env = process.env.NODE_ENV;

		if (!allowedEnv || allowedEnv.length === 0) {
			return true;
		}

		if (!allowedEnv.includes(env)) {
			throw new ForbiddenException('Tính năng không khả dụng');
		}

		return true;
	}
}
