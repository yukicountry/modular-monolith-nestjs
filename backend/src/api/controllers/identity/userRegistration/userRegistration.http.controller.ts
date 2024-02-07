import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import { Result } from 'neverthrow';
import {
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
} from 'src/api/openapi/decorators';
import { RegisterNewUserCommand } from 'src/modules/identity/application/userRegistration/registerNewUser/registerNewUser.command';
import { UserRegistrationId } from 'src/modules/identity/domain/userRegistration/valueObjects/userRegistrationId.valueObject';
import { BadCommandError } from 'src/shared/application/badCommand.error';
import { RegisterNewUserRequestDto } from './registerNewUser.request.dto';
import { RegisterNewUserResponseDto } from './registerNerUser.response.dto';

@Controller('api/registration')
export class UserRegistrationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '新規登録' })
  @ApiBadRequestResponse()
  @ApiUnprocessableEntityResponse()
  async registerNewUser(
    @Body() body: RegisterNewUserRequestDto,
  ): Promise<RegisterNewUserResponseDto> {
    const result: Result<UserRegistrationId, BadCommandError> =
      await this.commandBus.execute(
        new RegisterNewUserCommand({
          props: {
            email: body.email,
            rawPassword: body.password,
          },
        }),
      );

    if (result.isOk()) {
      return new RegisterNewUserResponseDto(result.value.value);
    } else {
      throw new BadRequestException(result.error.message, {
        cause: result.error,
      });
    }
  }
}
