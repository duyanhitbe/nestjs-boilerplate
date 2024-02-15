import { UserModel } from '@apis/user/models/user.model';
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
import { BookModel } from './models/book.model';

@Resolver(() => BookModel)
export class BookResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly userService: IUserService
	) {}

	@ResolveField(() => UserModel)
	user(@Root() root: BookModel) {
		return this.userService.getOneById(root.userId);
	}

	@Query(() => BookPaginated)
	getAllBookPaginated(@Args('query', { nullable: true }) query: GetAllBookArgs) {
		return this.commandBus.execute(new GetAllBookPaginatedCommand({ query }));
	}

	@Query(() => BookModel)
	getOneBook(@Args('id') id: string) {
		return this.commandBus.execute(new GetOneBookByIdCommand({ id }));
	}

	@Mutation(() => BookModel)
	createBook(@Args('data') data: CreateBookInput) {
		return this.commandBus.execute(new CreateBookCommand({ data }));
	}

	@Mutation(() => BookModel)
	updateBook(
		@Args('id') id: string,
		@Args('data', { nullable: true }) data: UpdateBookByIdInput
	) {
		return this.commandBus.execute(new UpdateBookByIdCommand({ id, data }));
	}

	@Mutation(() => BookModel)
	removeBook(@Args('id') id: string) {
		return this.commandBus.execute(new RemoveBookByIdCommand({ id }));
	}
}
