import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable, map } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	private logger = new Logger('HTTP');

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> | Promise<Observable<any>> {
		console.log('');
		const begin = Date.now();
		const type = context.getType<GqlContextType>();
		const isGraphQL = type === 'graphql';
		const ctx = GqlExecutionContext.create(context);
		const gqlReq = ctx.getContext().req;
		const gqlRes = gqlReq.res;

		if (isGraphQL) {
			const info = ctx.getInfo();
			const parentType = info.parentType.name;
			const fieldName = info.fieldName;
			const { headers } = gqlReq;
			const ip = headers['x-forwarded-for'];
			const host = headers['host'];
			const args = ctx.getArgs();
			this.logger.verbose(`[${parentType}]-[${fieldName}] - ${host} - ${ip}`);
			this.logger.verbose(`[args] - ${JSON.stringify(args)}`);
		}

		return next.handle().pipe(
			map((data) => {
				if (isGraphQL) {
					const end = Date.now();
					let timeSpent = end - begin;
					let unitTime = 'ms';
					if (timeSpent >= 1000) {
						timeSpent = timeSpent / 1000;
						unitTime = 's';
					}
					const { statusCode } = gqlRes;
					const logMessage = `[${statusCode}] - ${timeSpent}${unitTime}`;
					if (statusCode === 200 || statusCode === 201) {
						this.logger.verbose(logMessage);
					} else {
						this.logger.error(logMessage);
					}
				}

				return data;
			})
		);
	}
}
