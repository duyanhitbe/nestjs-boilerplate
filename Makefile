mock:
	npx hygen generate mock $(name)
e2e:
	npx hygen generate e2e $(name)
crud:
	nest g res apis/$(name)
	make mock name=$(name)
	make e2e name=$(name)
feat:
	npx hygen generate feat --module $(module) --name $(name)
