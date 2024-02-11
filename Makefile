crud:
	nest g res apis/$(name)
	npx hygen generate mock $(name)
	npx hygen generate e2e $(name)
feat:
	npx hygen generate feat --module $(module) --name $(name)
create-migration:
	npm run typeorm:create-migration --name=$(name) 
generate-migration:
	npm run typeorm:generate-migration --name=$(name) 
run-migration:
	npm run typeorm:run-migrations
revert-migration:
	npm run typeorm:revert-migrations
