import { UserModel } from '@apis/user/models/user.model';
import { User } from '@common';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './auth.schema';
import { LoginCommand } from './commands/login.command';
import { LoginUserInput } from './dto/login-user.input';
import { UserLocalGuard } from './guards/user-local.guard';

@Resolver()
export class AuthResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@UseGuards(UserLocalGuard)
	@Mutation(() => LoginResponse)
	loginUser(@Args('data') _loginUserDto: LoginUserInput, @User() user: UserModel) {
		return this.commandBus.execute(new LoginCommand({ user }));
	}
}
