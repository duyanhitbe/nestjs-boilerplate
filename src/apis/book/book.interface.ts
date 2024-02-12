import { BaseService } from '@common';
import { BookModel } from './models/book.model';

export abstract class IBookService extends BaseService<BookModel> {}
