---
to: src/apis/<%= module %>/handlers/<%= name %>.handler.ts
---
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { <%= h.inflection.undasherize(name) %>Command } from '../commands/<%= name %>.command';

@CommandHandler(<%= h.inflection.undasherize(name) %>Command)
export class <%= h.inflection.undasherize(name) %>Handler implements ICommandHandler<<%= h.inflection.undasherize(name) %>Command> {
	private logger = new Logger(<%= h.inflection.undasherize(name) %>Handler.name);

	async execute(command: <%= h.inflection.undasherize(name) %>Command) {
		this.logger.debug('execute');
		const {} = command;
	}
}
