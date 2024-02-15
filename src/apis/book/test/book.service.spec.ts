import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BookModel } from '../models/book.model';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';

const mockBookModel = jest.fn().mockReturnValue({});

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
					useValue: mockBookModel
				}
			]
		}).compile();

		service = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
