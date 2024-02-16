import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import * as packageJson from 'packageJson';

describe('UserService', () => {
	let service: AppService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AppService]
		}).compile();

		service = module.get<AppService>(AppService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getHello', () => {
		it('should return name and version of project', async () => {
			const name = packageJson.name;
			const version = packageJson.version;
			const message = `${name} v${version}`;
			const result = service.getHello();
			expect(result).toEqual(message);
		});
	});
});
