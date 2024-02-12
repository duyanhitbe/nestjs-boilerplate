import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookModel } from './models/book.model';
import { IBookService } from './book.interface';

@Injectable()
export class BookService extends IBookService {
	notFoundMessage = 'Không tìm thấy Book';

	constructor(@InjectModel(BookModel.name) private readonly bookModel: Model<BookModel>) {
		super(bookModel);
	}
}
