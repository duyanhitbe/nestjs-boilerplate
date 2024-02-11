import { BaseService } from '@common';
import { BookEntity } from './entities/book.entity';

export abstract class IBookService extends BaseService<BookEntity> {}
