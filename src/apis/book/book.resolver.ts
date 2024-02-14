import { UserEntity } from '@apis/user/entities/user.entity';
import { IUserService } from '@apis/user/user.interface';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { BookPaginated, GetAllBookArgs } from './book.schema';
import { CreateBookCommand } from './commands/create-book.command';
import { GetAllBookPaginatedCommand } from './commands/get-all-book-paginated.command';
import { GetOneBookByIdCommand } from './commands/get-one-book-by-id.command';
import { RemoveBookByIdCommand } from './commands/remove-book-by-id.command';
import { UpdateBookByIdCommand } from './commands/update-book-by-id.command';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookByIdInput } from './dto/update-book-by-id.input';
import { BookEntity } from './entities/book.entity';

@Resolver(() => BookEntity)
export class BookResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly userService: IUserService
	) {}

	@ResolveField(() => UserEntity)
	user(@Root() root: BookEntity) {
		return this.userService.getOneById(root.userId);
	}

	@Query(() => BookPaginated)
	getAllBookPaginated(@Args('query', { nullable: true }) query: GetAllBookArgs) {
		return this.commandBus.execute(new GetAllBookPaginatedCommand({ query }));
	}

	@Query(() => BookEntity)
	getOneBook(@Args('id') id: string) {
		return this.commandBus.execute(new GetOneBookByIdCommand({ id }));
	}

	@Mutation(() => BookEntity)
	createBook(@Args('data') data: CreateBookInput) {
		return this.commandBus.execute(new CreateBookCommand({ data }));
	}

	@Mutation(() => BookEntity)
	updateBook(
		@Args('id') id: string,
		@Args('data', { nullable: true }) data: UpdateBookByIdInput
	) {
		return this.commandBus.execute(new UpdateBookByIdCommand({ id, data }));
	}

	@Mutation(() => BookEntity)
	removeBook(@Args('id') id: string) {
		return this.commandBus.execute(new RemoveBookByIdCommand({ id }));
	}
}
