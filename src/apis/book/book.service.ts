import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBookService } from './book.interface';
import { BookModel } from './models/book.model';

@Injectable()
export class BookService extends IBookService {
	notFoundMessage = 'Không tìm thấy Book';

	constructor(@InjectModel(BookModel.name) private readonly bookModel: Model<BookModel>) {
		super(bookModel);
	}
}
