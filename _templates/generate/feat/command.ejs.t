---
to: src/apis/<%= module %>/commands/<%= name %>.command.ts
---
export class <%= h.inflection.undasherize(name) %>Command {
	constructor(data: <%= h.inflection.undasherize(name) %>Command) {
		Object.assign(this, data);
	}
}
