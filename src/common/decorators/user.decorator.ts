import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
	const context = GqlExecutionContext.create(ctx);
	const gqlReq = context.getContext().req;
	if (gqlReq) {
		return gqlReq.user;
	}
	return ctx.switchToHttp().getRequest().user;
});
