import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { IJwtService } from '../jwt.interface';
import { JwtService } from '../jwt.service';

describe('JwtService', () => {
	const OLD_ENV = process.env;
	let service: IJwtService;

	beforeEach(async () => {
		jest.resetModules(); // Most important - it clears the cache
		process.env = { ...OLD_ENV }; // Make a copy
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NestJwtService,
				{
					provide: IJwtService,
					useClass: JwtService
				}
			]
		}).compile();

		service = module.get<IJwtService>(IJwtService);
	});

	afterAll(() => {
		process.env = OLD_ENV; // Restore old environment
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('sign', () => {
		it('should throw error when not provide secret', async () => {
			await expect(service.sign({ id: '123' })).rejects.toThrow();
		});
		it('should return accessToken', async () => {
			process.env.SECRET_JWT = '123';
			service = new JwtService(new NestJwtService());
			const token = await service.sign({ id: '123' });
			expect(token).toBeDefined();
		});
	});
	describe('verify', () => {
		it('should throw error when provide invalid token', async () => {
			process.env.SECRET_JWT = '123';
			const newService = new JwtService(new NestJwtService());
			const token = await newService.sign({ id: '123' });
			process.env.SECRET_JWT = '456';
			service = new JwtService(new NestJwtService());
			await expect(service.verify(token)).rejects.toThrow();
		});
		it('should verified token', async () => {
			process.env.SECRET_JWT = '123';
			const newService = new JwtService(new NestJwtService());
			const token = await newService.sign({ id: '123' });
			process.env.SECRET_JWT = '123';
			service = new JwtService(new NestJwtService());
			const payload = await service.verify(token);
			expect(payload.id).toEqual('123');
		});
	});
});
