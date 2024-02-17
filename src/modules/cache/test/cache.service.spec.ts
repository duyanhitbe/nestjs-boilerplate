import { MetadataKey } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICacheService } from '../cache.interface';
import { CacheService } from '../cache.service';

const mockRedisService = jest.fn(() => ({
	set: jest.fn(() => Promise.resolve('OK')),
	setnx: jest.fn(() => Promise.resolve(1)),
	get: jest.fn((key: string) => {
		if (key === '1') {
			return null;
		}
		return 'data';
	}),
	del: jest.fn(() => Promise.resolve(1)),
	keys: jest.fn((key: string) => Promise.resolve([`1`, `2`]))
}));

describe('CacheService', () => {
	let service: ICacheService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: MetadataKey.REDIS,
					useFactory: mockRedisService
				},
				{
					provide: ICacheService,
					useClass: CacheService
				}
			]
		}).compile();

		service = module.get<ICacheService>(ICacheService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	describe('set', () => {
		it('should return OK', async () => {
			const result = await service.set('key', 'value', 60);
			expect(result).toEqual('OK');
		});
	});
	describe('setnx', () => {
		it('should return number', async () => {
			const result = await service.setNx('key', 'value');
			expect(result).toEqual(1);
		});
	});
	describe('get', () => {
		it('should return null', async () => {
			const result = await service.get('1');
			expect(result).toEqual(null);
		});
		it('should return data', async () => {
			const result = await service.get('2');
			expect(result).toEqual('data');
		});
	});
	describe('del', () => {
		it('should return number', async () => {
			const result = await service.del('key');
			expect(result).toEqual(1);
		});
	});
	describe('keys', () => {
		it('should return list of string', async () => {
			const keys = await service.keys('foo');
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				expect(key).toEqual(`${i + 1}`);
			}
		});
	});
});
