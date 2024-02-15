---
to: test/<%= name %>.e2e-spec.ts
---
import { Create<%= h.inflection.camelize(name) %>Dto } from '@apis/<%= name %>/dto/create-<%= name %>.dto';
import { Update<%= h.inflection.camelize(name) %>ByIdDto } from '@apis/<%= name %>/dto/update-<%= name %>-by-id.dto';
import { I<%= h.inflection.camelize(name) %>Service } from '@apis/<%= name %>/<%= name %>.interface';
import { <%= h.inflection.camelize(name) %>Entity } from '@apis/<%= name %>/entities/<%= name %>.entity';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('<%= h.inflection.camelize(name) %>Controller (e2e)', () => {
	let app: INestApplication;
	let httpServer: any;
	let <%= h.inflection.camelize(name, true) %>Service: I<%= h.inflection.camelize(name) %>Service;
	let <%= h.inflection.camelize(name, true) %>: <%= h.inflection.camelize(name) %>Entity;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		httpServer = app.getHttpServer();
		app.enableCors({
			origin: true,
			credentials: true
		});
		app.enableVersioning({
			type: VersioningType.URI,
			defaultVersion: '1'
		});
		await app.init();

		//Remove all <%= name %>
		<%= h.inflection.camelize(name, true) %>Service = app.get<I<%= h.inflection.camelize(name) %>Service>(I<%= h.inflection.camelize(name) %>Service);
		await <%= h.inflection.camelize(name, true) %>Service.softRemoveAll();
		<%= h.inflection.camelize(name, true) %> = await <%= h.inflection.camelize(name, true) %>Service.create({
			name: 'name'
		});
	});

	afterAll(async () => {
		await <%= h.inflection.camelize(name, true) %>Service.softRemoveAll();
		await app.close();
	});

	it('/v1/<%= name %> (GET)', async () => {
		await <%= h.inflection.camelize(name, true) %>Service.create({
			name: '<%= name %>'
		});
		return request(httpServer)
			.get('/v1/<%= name %>')
			.query({ limit: 1, page: 1, order: JSON.stringify({ createdAt: 'asc' }) })
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data?.length).toEqual(1);
				expect(body.data?.[0].id).toEqual(<%= h.inflection.camelize(name, true) %>.id);
				expect(body.pagination.limit).toEqual(1);
				expect(body.pagination.page).toEqual(1);
				expect(body.pagination.total).toEqual(2);
			});
	});
	it('/v1/<%= name %>/:id (GET)', async () => {
		return request(httpServer)
			.get(`/v1/<%= name %>/${<%= h.inflection.camelize(name, true) %>.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(<%= h.inflection.camelize(name, true) %>.id);
			});
	});
	it('/v1/<%= name %> (POST)', () => {
		const create<%= h.inflection.camelize(name) %>Data: Create<%= h.inflection.camelize(name) %>Dto = {
			name: '<%= name %>'
		};
		return request(httpServer)
			.post('/v1/<%= name %>')
			.send(create<%= h.inflection.camelize(name) %>Data)
			.expect(201)
			.then(({ body }) => {
				expect(body.status).toEqual(201);
				expect(body.message).toEqual('success');
			});
	});
	it('/v1/<%= name %>/:id (PATCH)', async () => {
		const update<%= h.inflection.camelize(name) %>Data: Update<%= h.inflection.camelize(name) %>ByIdDto = {
			name: 'updated<%= h.inflection.camelize(name) %>'
		};
		return request(httpServer)
			.patch(`/v1/<%= name %>/${<%= h.inflection.camelize(name, true) %>.id}`)
			.send(update<%= h.inflection.camelize(name) %>Data)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(<%= h.inflection.camelize(name, true) %>.id);
			});
	});
	it('/v1/<%= name %>/:id (DELETE)', async () => {
		return request(httpServer)
			.patch(`/v1/<%= name %>/${<%= h.inflection.camelize(name, true) %>.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(<%= h.inflection.camelize(name, true) %>.id);
			});
	});
});
