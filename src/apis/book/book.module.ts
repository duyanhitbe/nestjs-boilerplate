import { UserModule } from '@apis/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IBookService } from './book.interface';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { CreateBookHandler } from './handlers/create-book.handler';
import { GetAllBookPaginatedHandler } from './handlers/get-all-book-paginated.handler';
import { GetOneBookByIdHandler } from './handlers/get-one-book-by-id.handler';
import { RemoveBookByIdHandler } from './handlers/remove-book-by-id.handler';
import { UpdateBookByIdHandler } from './handlers/update-book-by-id.handler';
import { BookModel, BookSchema } from './models/book.model';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: BookModel.name, schema: BookSchema }]),
		UserModule
	],
	providers: [
		{
			provide: IBookService,
			useClass: BookService
		},
		BookResolver,
		CreateBookHandler,
		GetAllBookPaginatedHandler,
		GetOneBookByIdHandler,
		RemoveBookByIdHandler,
		UpdateBookByIdHandler
	],
	exports: [IBookService]
})
export class BookModule {}
