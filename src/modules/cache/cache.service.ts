import { MetadataKey } from '@app/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ICacheService } from './cache.interface';

@Injectable()
export class CacheService extends ICacheService {
	constructor(@Inject(MetadataKey.REDIS) private redis: Redis) {
		super();
	}

	async set(key: string, value: string, expired: string | number): Promise<'OK'> {
		await this.del(key);
		return this.redis.set(key, value, 'EX', expired);
	}
	async setNx(key: string, value: string): Promise<number> {
		await this.del(key);
		return this.redis.setnx(key, value);
	}
	get(key: string): Promise<string | null> {
		return this.redis.get(key);
	}
	del(key: string) {
		return this.redis.del(key);
	}
	keys(prefix: string) {
		return this.redis.keys(`${prefix}:*`);
	}
}
