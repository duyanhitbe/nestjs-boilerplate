import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	return request.user;
});
