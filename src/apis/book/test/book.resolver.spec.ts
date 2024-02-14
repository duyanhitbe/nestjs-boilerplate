import { Test, TestingModule } from '@nestjs/testing';
import { BookResolver } from '../book.resolver';
import { BookService } from '../book.service';

jest.mock('../book.service');

describe('BookResolver', () => {
	let resolver: BookResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BookResolver, BookService]
		}).compile();

		resolver = module.get<BookResolver>(BookResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
