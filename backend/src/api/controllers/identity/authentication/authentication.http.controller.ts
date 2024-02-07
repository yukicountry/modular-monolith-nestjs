import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/api/guards/authenticated.guard';
import { LocalAuthGuard } from 'src/api/guards/localAuth.guard';
import { ApiUnprocessableEntityResponse } from 'src/api/openapi/decorators';
import { LoginRequestDto } from './login.request.dto';

@Controller('api/auth')
export class AuthenticationController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnprocessableEntityResponse()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Body() _: LoginRequestDto): Promise<void> {
    //
  }

  @Post('/logout')
  @ApiOperation({ summary: 'ログアウト' })
  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() request: Request): Promise<void> {
    request.session.destroy(() => {
      //
    });
  }
}
