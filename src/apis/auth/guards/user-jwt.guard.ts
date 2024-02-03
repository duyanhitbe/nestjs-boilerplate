import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../auth.const';

@Injectable()
export class UserJwtGuard extends AuthGuard(AuthStrategy.USER_JWT) {
	// Override this method so it can be used in graphql
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const gqlReq = ctx.getContext().req;
		if (gqlReq) {
			return gqlReq;
		}
		return context.switchToHttp().getRequest();
	}
}
