import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../auth.const';

@Injectable()
export class UserLocalGuard extends AuthGuard(AuthStrategy.USER_LOCAL) {
	// Override this method so it can be used in graphql
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const gqlReq = ctx.getContext().req;
		if (gqlReq) {
			const { data } = ctx.getArgs();
			gqlReq.body = data;
			return gqlReq;
		}
		return context.switchToHttp().getRequest();
	}
}
