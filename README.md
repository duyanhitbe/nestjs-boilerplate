<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## What is boilerplate code?
Boilerplate code is computer language text that you can reuse with little or no alteration in several different contexts.

## Description
This is a boilerplate using <b>NestJS</b>, a popular NodeJS framework, reducing time to write CRUD method by generating code.

## Installation
```bash
$ git clone https://github.com/duyanhitbe/nestjs-boilerplate.git

$ cd nestjs-boilerplate
```
Now, you can choose kind of ORM you want to use.
- Typeorm for SQL (typeorm)
- Mongoose for MongoDB (mongoose)

And, you can choose what type of API (Application Programming Interface):
- RESTful (rest)
- GraphQL (graphql)

Example:
```bash
$ git checkout rest/typeorm

$ pnpm install

# Install pnpm if you haven't
$ npm i -g pnpm
```

## Environment
```bash
$ cp .env.example .env
```
Then replace your owner config

## Running
```bash
# dev mode
$ pnpm start:dev

# prod mode
$ pnpm build
$ pnpm start:prod

# pm2
$ pm2 start ecosystem.config.js
```

## Testing
```bash
# Unit test
$ pnpm test

# End-to-End test
$ pnpm test:e2e
```

## Validate environment config
Using <b>joi</b> package to validate env variable. Example:
`src/modules/config/config.module.ts`
```typescript
@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().required(), //<- Must be a string and required
				PORT: Joi.number().required() //<- Must be a number and required
			})
		})
	]
})
export class ConfigModule {}
```


## Generating
Strong of this boilerplate code that you can generate CRUD module quickly with one command.
```bash
$ make crud name=example

? What transport layer do you use? (Use arrow keys)
❯ REST API #<-- Choose this one if you are using Restful
  GraphQL (code first) #<-- Choose this one if you are using GraphQL
  GraphQL (schema first) 
  Microservice (non-HTTP) 
  WebSockets

? Would you like to generate CRUD entry points? (Y/n) #<--Yes or Y
```

## Migration
If you're using TypeORM for your project, you can create or generate migration to run for SQL.

#### generate-migrations
```bash
$ make generate-migration name=migration_name
```
#### create-migration
```bash
$ make create-migration name=migration_name
```

When you run one of two command abort, it will generate a new file in <b>src/modules/database/migrations</b>. Let's import it to DatabaseModule

```typescript
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				migrations: [
		                  User1706412751363, 
		                  Book1707635652785
		                  NewMigrationFile //<-- Right here
		                ]
			})
		})
	]
})
export class DatabaseModule {}
```
#### run-migration
Now, you can run that migration by
```bash
$ make run-migration
```
Or just start the server, migration will run automatically

#### revert-migration
```bash
$ make revert-migration
```

## JsonWebToken
Base on package <b>@nestjs/jwt</b>, you can inject JwtService through its interface. Example:
```typescript
import { Injectable } from '@nestjs/common';
import { IJwtService } from '@modules/jwt';

@Injectable()
export class FooService {
	constructor(private readonly jwtService: IJwtService) {}
	
	async login(username: string, password: string) {
		//Validate user
		...
		return this.jwtService.sign({ username });
	}
}
```

## Cache
Using redis from <b>ioredis</b> package to improve your application
```typescript
import { Injectable } from '@nestjs/common';
import { IRedisService } from '@modules/redis';

@Injectable()
export class BarService {
	constructor(private readonly redisService: IRedisService) {}
	
	async getHugeData() {
		//Get data from cache
		const key = 'HUGE_DATA';
		const cachedData = await this.redisService.get(key);
		if (cachedData) {
			return cachedData;
		}
		
		const expireTime = 60 * 60; //1m
		const veryHugeData = getData();
		//Cache data
		this.redisService.set(key, veryHugeData, expireTime);
		return veryHugeData;
	}
}
```

## Schedule
Using <b>@nestjs/schedule</b> you can run multiple cron-job in CronService
```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
	private readonly logger = new Logger(CronService.name);
	
	/* When the number of second is 45, this method will be executed */
	@Cron('45 * * * * *') 
	helloWorld() {
		console.log('Hello World');
	}
}
```
Check this [link](https://docs.nestjs.com/techniques/task-scheduling) to more information

## I18N
Base on package `nestjs-i18n` to translate multiple language. Let's check it out

`src/modules/i18n/i18n.module.ts`
```typescript
@Module({
	imports: [
		I18nModule.forRoot({
			// Default language
			fallbackLanguage: Language.VI,
			// Load JSON file
			loaderOptions: {
				path: join(__dirname, '/translations/'),
				watch: true
			},
			// Resolver that I18nModule can verify which language do you want to use?
			// In this case, that is pass "x-lang" into header
			resolvers: [new HeaderResolver(['x-lang'])], 
			// Path to generate ts file
			typesOutputPath: join(
				__dirname,
				'/../../../../src/modules/i18n/generated/i18n.generated.ts'
			)
		})
	]
})
export class I18NModule {}
```
<br>

`src/modules/i18n/translations/vi/errors.json`
```json
{
    "WRONG_PASSWORD": "Wrong password"
}
```
Example:
```typescript
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CronService {
	constructor(private readonly i18n: I18nService) {}
	
	getHello(): string {
		return this.i18n.t('test.WRONG_PASSWORD');
	}
}
```
Validation with class-validator
```typescript
import { IsString, IsNotEmpty } from '@common'; // Import from '@common' not 'class-validator'

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
```
<br>

`src/common/decorators/validation.decorator.ts`
```typescript
import { translate } from '@app/modules/i18n/i18n.helper';
import { applyDecorators } from '@nestjs/common';
import * as validator from 'class-validator';

export const IsString = (validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.IsString({ ...validationOptions, message: translate('validation.IS_STRING') }) //Automatically translate in validation.json
	);

export const IsNotEmpty = (validationOptions?: validator.ValidationOptions) =>
	applyDecorators(
		validator.IsNotEmpty({
			...validationOptions,
			message: translate('validation.IS_NOT_EMPTY')
		})
	);
```

## Stay in touch
- Author - Duy Anh (doba)
- Email - [duyanh.it.work@gmail.com](mailto:duyanh.it.work@gmail.com)
- Linked - [profile](https://linkedin.com/in/duy-anh-nguyen-a62292249)
