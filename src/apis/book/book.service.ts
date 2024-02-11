import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { IBookService } from './book.interface';

@Injectable()
export class BookService extends IBookService {
	notFoundMessage = 'Không tìm thấy Book';

	constructor(@InjectRepository(BookEntity) private readonly bookRepo: Repository<BookEntity>) {
		super(bookRepo);
	}
}
