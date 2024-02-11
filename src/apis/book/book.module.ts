import { UserModule } from '@apis/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { IBookService } from './book.interface';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';
import { CreateBookHandler } from './handlers/create-book.handler';
import { GetAllBookPaginatedHandler } from './handlers/get-all-book-paginated.handler';
import { GetOneBookByIdHandler } from './handlers/get-one-book-by-id.handler';
import { RemoveBookByIdHandler } from './handlers/remove-book-by-id.handler';
import { UpdateBookByIdHandler } from './handlers/update-book-by-id.handler';

@Module({
	imports: [TypeOrmModule.forFeature([BookEntity]), UserModule],
	controllers: [BookController],
	providers: [
		{
			provide: IBookService,
			useClass: BookService
		},
		CreateBookHandler,
		GetAllBookPaginatedHandler,
		GetOneBookByIdHandler,
		RemoveBookByIdHandler,
		UpdateBookByIdHandler
	],
	exports: [IBookService]
})
export class BookModule {}
