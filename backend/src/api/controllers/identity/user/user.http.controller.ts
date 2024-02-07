import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserCommandHandler } from 'src/modules/identity/application/user/createUser/createUser.commandHandler';
import { CreateUserCommand } from 'src/modules/identity/application/user/createUser/createUser.command';
import { CreateUserRequestDto } from './createUser.request.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly commandHandler: CreateUserCommandHandler) {}

  @Post()
  async createUser(@Body() body: CreateUserRequestDto): Promise<string> {
    const userId = await this.commandHandler.handle(
      new CreateUserCommand({
        props: { ...body },
      }),
    );

    return userId.value;
  }
}
