export const CacheService = jest.fn().mockReturnValue({
	set: jest.fn((_key: string, _value: string, _expired: string | number) =>
		Promise.resolve('OK')
	),
	setNx: jest.fn((_key: string, _value: string) => Promise.resolve(1)),
	get: jest.fn((_key: string) => Promise.resolve('data')),
	del: jest.fn((_key: string) => Promise.resolve(1)),
	keys: jest.fn((_prefix: string) => Promise.resolve(['key1', 'key2']))
});
