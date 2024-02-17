import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';
import { BookModel } from '../models/book.model';

const mockBookModel = jest.fn(() => ({}));

describe('BookService', () => {
	let service: IBookService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IBookService,
					useClass: BookService
				},
				{
					provide: getModelToken(BookModel.name),
					useFactory: mockBookModel
				}
			]
		}).compile();

		service = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
