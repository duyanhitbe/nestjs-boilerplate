import { UserModel } from '@apis/user/models/user.model';
import { ApiController, User } from '@common';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from './auth.const';
import { ApiLogin } from './auth.swagger';
import { LoginCommand } from './commands/login.command';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
@ApiController('Auth')
export class AuthController {
	constructor(private readonly commandBus: CommandBus) {}

	@UseGuards(AuthGuard(AuthStrategy.USER_LOCAL))
	@Post('user/login')
	@HttpCode(200)
	@ApiLogin('user')
	loginUser(@Body() _loginUserDto: LoginUserDto, @User() user: UserModel) {
		return this.commandBus.execute(new LoginCommand({ user }));
	}
}
