import { IBookService } from '@apis/book/book.interface';
import { CreateBookInput } from '@apis/book/dto/create-book.input';
import { UpdateBookByIdInput } from '@apis/book/dto/update-book-by-id.input';
import { UserModel } from '@app/apis/user/models/user.model';
import { IUserService } from '@app/apis/user/user.interface';
import { AppModule } from '@app/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('BookResolver (e2e)', () => {
	let app: INestApplication;
	let bookService: IBookService;
	let userService: IUserService;
	let user: UserModel;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		//Remove all book
		bookService = app.get<IBookService>(IBookService);
		userService = app.get<IUserService>(IUserService);
		await userService.softRemoveAll();
		await bookService.softRemoveAll();
		user = await userService.create({
			username: 'username',
			password: 'password'
		});
	});

	afterAll(async () => {
		await userService.softRemoveAll();
		await bookService.softRemoveAll();
		await app.close();
	});

	it('getAllBookPaginated (Query)', async () => {
		const book1 = await bookService.create({
			name: 'book',
			userId: user.id
		});
		const book2 = await bookService.create({
			name: 'book',
			userId: user.id
		});
		const getAllBookPaginatedQuery = `
			query GetAllBookPaginated($query: GetAllBookArgs) {
				getAllBookPaginated(query: $query) {
					data {
						id
						createdAt
						updatedAt
						deletedAt
						isActive
						name
					}
					pagination {
						limit
						page
						total
					}
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					query: {
						limit: 1,
						page: 1,
						order: {
							createdAt: 'ASC'
						}
					}
				},
				query: getAllBookPaginatedQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { getAllBookPaginated }
					}
				}) => {
					expect(getAllBookPaginated.data?.length).toEqual(1);
					expect(getAllBookPaginated.data?.[0].id).toEqual(book1.id);
					expect(getAllBookPaginated.pagination.limit).toEqual(1);
					expect(getAllBookPaginated.pagination.page).toEqual(1);
					expect(getAllBookPaginated.pagination.total).toEqual(2);
				}
			);
	});
	it('getOneBook (Query)', async () => {
		const book = await bookService.create({
			name: 'book',
			userId: user.id
		});
		const getOneBookQuery = `
			query GetOneBook($getOneBookId: String!) {
				getOneBook(id: $getOneBookId) {
					id
					createdAt
					updatedAt
					deletedAt
					isActive
					name
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					getOneBookId: book.id
				},
				query: getOneBookQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { getOneBook }
					}
				}) => {
					expect(getOneBook?.id).toEqual(book.id);
				}
			);
	});
	it('createBook (Mutation)', () => {
		const createBookData: CreateBookInput = {
			name: 'book',
			userId: user.id
		};
		const createBookQuery = `
			mutation CreateBook($data: CreateBookInput!) {
				createBook(data: $data) {
					id
					createdAt
					updatedAt
					deletedAt
					isActive
					name
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					data: createBookData
				},
				query: createBookQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { createBook }
					}
				}) => {
					expect(createBook?.id).toBeDefined();
					expect(createBook?.createdAt).toBeDefined();
					expect(createBook?.updatedAt).toBeDefined();
					expect(createBook?.deletedAt).toBeDefined();
					expect(createBook?.isActive).toBeDefined();
					expect(createBook?.name).toBeDefined();
				}
			);
	});
	it('updateBook (Mutation)', async () => {
		const book = await bookService.create({
			name: 'book',
			userId: user.id
		});
		const updatedBookName = 'updatedBookName';
		const updateBookData: UpdateBookByIdInput = {
			name: updatedBookName
		};
		const updateBookQuery = `
			mutation UpdateBook($updateBookId: String!, $data: UpdateBookByIdInput) {
				updateBook(id: $updateBookId, data: $data) {
					id
					createdAt
					updatedAt
					deletedAt
					isActive
					name
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					updateBookId: book.id,
					data: updateBookData
				},
				query: updateBookQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { updateBook }
					}
				}) => {
					expect(updateBook?.id).toBeDefined();
					expect(updateBook?.createdAt).toBeDefined();
					expect(updateBook?.updatedAt).toBeDefined();
					expect(updateBook?.deletedAt).toBeDefined();
					expect(updateBook?.isActive).toBeDefined();
					expect(updateBook?.name).toEqual(updatedBookName);
				}
			);
	});
	it('removeBook (Mutation)', async () => {
		const book = await bookService.create({
			name: 'book',
			userId: user.id
		});
		const removeBookQuery = `
			mutation RemoveBook($removeBookId: String!) {
				removeBook(id: $removeBookId) {
					id
					createdAt
					updatedAt
					deletedAt
					isActive
					name
				}
			}
		`;
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				variables: {
					removeBookId: book.id
				},
				query: removeBookQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { removeBook }
					}
				}) => {
					expect(removeBook?.id).toBeDefined();
					expect(removeBook?.createdAt).toBeDefined();
					expect(removeBook?.updatedAt).toBeDefined();
					expect(removeBook?.deletedAt).toBeDefined();
					expect(removeBook?.isActive).toBeDefined();
					expect(removeBook?.name).toBeDefined();
				}
			);
	});
});
