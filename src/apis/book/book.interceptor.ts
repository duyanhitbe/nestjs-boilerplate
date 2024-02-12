import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	UseInterceptors,
	applyDecorators
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { BookPaginatedResponse, BookResponse } from './dto/book-response.dto';
import { BookModel } from './models/book.model';

@Injectable()
export class BookInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
		return handler.handle().pipe(
			map((data: BookModel) => {
				return plainToInstance(BookResponse, data, {
					excludeExtraneousValues: true
				});
			})
		);
	}
}

@Injectable()
export class BookPaginatedInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
		return handler.handle().pipe(
			map((bookPaginated: IPaginationResponse<BookModel>) => {
				return plainToInstance(BookPaginatedResponse, bookPaginated, {
					excludeExtraneousValues: true
				});
			})
		);
	}
}

export const UseBookInterceptor = () => applyDecorators(UseInterceptors(BookInterceptor));

export const UseBookPaginatedInterceptor = () =>
	applyDecorators(UseInterceptors(BookPaginatedInterceptor));
