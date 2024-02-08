---
to: src/apis/<%= module %>/test/<%= name %>.handler.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing';
import { <%= h.inflection.undasherize(name) %>Command } from '../commands/<%= name %>.command';
import { <%= h.inflection.undasherize(name) %>Handler } from '../handlers/<%= name %>.handler';

describe('<%= h.inflection.undasherize(name) %>Handler', () => {
	let handler: <%= h.inflection.undasherize(name) %>Handler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				<%= h.inflection.undasherize(name) %>Handler
			]
		}).compile();

		handler = module.get<<%= h.inflection.undasherize(name) %>Handler>(<%= h.inflection.undasherize(name) %>Handler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});
});

