import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FetchAccountSettingsResponseDto } from './fetchAccountSettings.response.dto';
import { AuthenticatedGuard } from 'src/api/guards/authenticated.guard';
import { GetUserQuery } from 'src/modules/identity/application/user/getUser/getUser.query';
import { QueryBus } from '@nestjs/cqrs';
import { UserDto } from 'src/modules/identity/application/user/getUser/user.dto';
import { ApiForbiddenResponse } from 'src/api/openapi/decorators/forbidden.decorator';
import { ApiInternalServerErrorResponse } from 'src/api/openapi/decorators/internalServerError.decorator';

@Controller('api/mypage/account')
export class FetchAccountSettingsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticatedGuard)
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  async handle(@Req() request): Promise<FetchAccountSettingsResponseDto> {
    console.log(request.user.id);

    const userDto = await this.queryBus.execute<
      GetUserQuery,
      UserDto | undefined
    >(new GetUserQuery(request.user.id));

    if (userDto == null) {
      throw new NotFoundException();
    } else {
      return new FetchAccountSettingsResponseDto(
        userDto.userName,
        userDto.email,
      );
    }
  }
}
