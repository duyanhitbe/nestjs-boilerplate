---
to: test/<%= name %>.e2e-spec.ts
---
import { Create<%= h.inflection.undasherize(name) %>Input } from '@apis/<%= name %>/dto/create-<%= name %>.input';
import { Update<%= h.inflection.undasherize(name) %>ByIdInput } from '@apis/<%= name %>/dto/update-<%= name %>-by-id.input';
import { I<%= h.inflection.undasherize(name) %>Service } from '@apis/<%= name %>/<%= name %>.interface';
import { <%= h.inflection.undasherize(name) %>Model } from '@apis/<%= name %>/models/<%= name %>.model';
import { AppModule } from '@app/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('<%= h.inflection.undasherize(name) %>Resolver (e2e)', () => {
	let app: INestApplication;
	let <%= h.inflection.camelize(name, true) %>Service: I<%= h.inflection.undasherize(name) %>Service;
	let <%= h.inflection.camelize(name, true) %>: <%= h.inflection.undasherize(name) %>Model;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		//Remove all <%= h.inflection.camelize(name, true) %>
		<%= h.inflection.camelize(name, true) %>Service = app.get<I<%= h.inflection.undasherize(name) %>Service>(I<%= h.inflection.undasherize(name) %>Service);
		await <%= h.inflection.camelize(name, true) %>Service.softRemoveAll();
		<%= h.inflection.camelize(name, true) %> = await await <%= h.inflection.camelize(name, true) %>Service.create({
			name: '<%= name %>'
		});
	});

	afterAll(async () => {
		await <%= h.inflection.camelize(name, true) %>Service.softRemoveAll();
		await app.close();
	});

	it('getAll<%= h.inflection.undasherize(name) %>Paginated (Query)', async () => {
		await <%= h.inflection.camelize(name, true) %>Service.create({
			name: '<%= h.inflection.camelize(name, true) %>'
		});
		const getAll<%= h.inflection.undasherize(name) %>PaginatedQuery = `
			query GetAll<%= h.inflection.undasherize(name) %>Paginated($query: GetAll<%= h.inflection.undasherize(name) %>Args) {
				getAll<%= h.inflection.undasherize(name) %>Paginated(query: $query) {
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
				query: getAll<%= h.inflection.undasherize(name) %>PaginatedQuery
			})
			.expect(200)
			.then(
				({
					body: {
						data: { getAll<%= h.inflection.undasherize(name) %>Paginated }
					}
				}) => {
					expect(getAll<%= h.inflection.undasherize(name) %>Paginated.data?.length).toEqual(1);
					expect(getAll<%= h.inflection.undasherize(name) %>Paginated.data?.[0].id).toEqual(<%= h.inflection.camelize(name, true) %>.id);
					expect(getAll<%= h.inflection.undasherize(name) %>Paginated.pagination.limit).toEqual(1);
					expect(getAll<%= h.inflection.undasherize(name) %>Paginated.pagination.page).toEqual(1);
					expect(getAll<%= h.inflection.undasherize(name) %>Paginated.pagination.total).toEqual(2);
				}
			);
	});
	it('getOne<%= h.inflection.undasherize(name) %> (Query)', async () => {
		const getOne<%= h.inflection.undasherize(name) %>Query = `
			query GetOne<%= h.inflection.undasherize(name) %>($getOne<%= h.inflection.undasherize(name) %>Id: String!) {
				getOne<%= h.inflection.undasherize(name) %>(id: $getOne<%= h.inflection.undasherize(name) %>Id) {
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
					getOne<%= h.inflection.undasherize(name) %>Id: <%= h.inflection.camelize(name, true) %>.id
				},
				query: getOne<%= h.inflection.undasherize(name) %>Query
			})
			.expect(200)
			.then(
				({
					body: {
						data: { getOne<%= h.inflection.undasherize(name) %> }
					}
				}) => {
					expect(getOne<%= h.inflection.undasherize(name) %>?.id).toEqual(<%= h.inflection.camelize(name, true) %>.id);
				}
			);
	});
	it('create<%= h.inflection.undasherize(name) %> (Mutation)', () => {
		const create<%= h.inflection.undasherize(name) %>Data: Create<%= h.inflection.undasherize(name) %>Input = {
			name: '<%= h.inflection.camelize(name, true) %>'
		};
		const create<%= h.inflection.undasherize(name) %>Query = `
			mutation Create<%= h.inflection.undasherize(name) %>($data: Create<%= h.inflection.undasherize(name) %>Input!) {
				create<%= h.inflection.undasherize(name) %>(data: $data) {
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
					data: create<%= h.inflection.undasherize(name) %>Data
				},
				query: create<%= h.inflection.undasherize(name) %>Query
			})
			.expect(200)
			.then(
				({
					body: {
						data: { create<%= h.inflection.undasherize(name) %> }
					}
				}) => {
					expect(create<%= h.inflection.undasherize(name) %>?.id).toBeDefined();
					expect(create<%= h.inflection.undasherize(name) %>?.createdAt).toBeDefined();
					expect(create<%= h.inflection.undasherize(name) %>?.updatedAt).toBeDefined();
					expect(create<%= h.inflection.undasherize(name) %>?.deletedAt).toBeDefined();
					expect(create<%= h.inflection.undasherize(name) %>?.isActive).toBeDefined();
					expect(create<%= h.inflection.undasherize(name) %>?.name).toBeDefined();
				}
			);
	});
	it('update<%= h.inflection.undasherize(name) %> (Mutation)', async () => {
		const updated<%= h.inflection.undasherize(name) %>Name = 'updated<%= h.inflection.undasherize(name) %>Name';
		const update<%= h.inflection.undasherize(name) %>Data: Update<%= h.inflection.undasherize(name) %>ByIdInput = {
			name: updated<%= h.inflection.undasherize(name) %>Name
		};
		const update<%= h.inflection.undasherize(name) %>Query = `
			mutation Update<%= h.inflection.undasherize(name) %>($update<%= h.inflection.undasherize(name) %>Id: String!, $data: Update<%= h.inflection.undasherize(name) %>ByIdInput) {
				update<%= h.inflection.undasherize(name) %>(id: $update<%= h.inflection.undasherize(name) %>Id, data: $data) {
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
					update<%= h.inflection.undasherize(name) %>Id: <%= h.inflection.camelize(name, true) %>.id,
					data: update<%= h.inflection.undasherize(name) %>Data
				},
				query: update<%= h.inflection.undasherize(name) %>Query
			})
			.expect(200)
			.then(
				({
					body: {
						data: { update<%= h.inflection.undasherize(name) %> }
					}
				}) => {
					expect(update<%= h.inflection.undasherize(name) %>?.id).toBeDefined();
					expect(update<%= h.inflection.undasherize(name) %>?.createdAt).toBeDefined();
					expect(update<%= h.inflection.undasherize(name) %>?.updatedAt).toBeDefined();
					expect(update<%= h.inflection.undasherize(name) %>?.deletedAt).toBeDefined();
					expect(update<%= h.inflection.undasherize(name) %>?.isActive).toBeDefined();
					expect(update<%= h.inflection.undasherize(name) %>?.name).toEqual(updated<%= h.inflection.undasherize(name) %>Name);
				}
			);
	});
	it('remove<%= h.inflection.undasherize(name) %> (Mutation)', async () => {
		const remove<%= h.inflection.undasherize(name) %>Query = `
			mutation Remove<%= h.inflection.undasherize(name) %>($remove<%= h.inflection.undasherize(name) %>Id: String!) {
				remove<%= h.inflection.undasherize(name) %>(id: $remove<%= h.inflection.undasherize(name) %>Id) {
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
					remove<%= h.inflection.undasherize(name) %>Id: <%= h.inflection.camelize(name, true) %>.id
				},
				query: remove<%= h.inflection.undasherize(name) %>Query
			})
			.expect(200)
			.then(
				({
					body: {
						data: { remove<%= h.inflection.undasherize(name) %> }
					}
				}) => {
					expect(remove<%= h.inflection.undasherize(name) %>?.id).toBeDefined();
					expect(remove<%= h.inflection.undasherize(name) %>?.createdAt).toBeDefined();
					expect(remove<%= h.inflection.undasherize(name) %>?.updatedAt).toBeDefined();
					expect(remove<%= h.inflection.undasherize(name) %>?.deletedAt).toBeDefined();
					expect(remove<%= h.inflection.undasherize(name) %>?.isActive).toBeDefined();
					expect(remove<%= h.inflection.undasherize(name) %>?.name).toBeDefined();
				}
			);
	});
});

