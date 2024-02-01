crud:
	nest g res apis/$(name)
	npx hygen generate mock $(name)
	npx hygen generate e2e $(name)
feat:
	npx hygen generate feat --module $(module) --name $(name)