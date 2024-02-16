import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';
import { BookEntity } from '../entities/book.entity';

const mockBookRepository = jest.fn(() => ({}));

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
					provide: getRepositoryToken(BookEntity),
					useFactory: mockBookRepository
				}
			]
		}).compile();

		service = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
