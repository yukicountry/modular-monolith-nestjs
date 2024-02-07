import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/api/guards/authenticated.guard';
import { CreateGroupRequestDto } from './createGroup.request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateGroupCommand } from 'src/modules/event/application/group/createGroup/createGroup.command';
import { Result } from 'neverthrow';
import { GroupId } from 'src/modules/event/domain/group/valueObjects/groupId.valueObject';
import { BusinessRuleViolationError } from 'src/shared/domain/businessRuleViolation.error';
import { CreateGroupResponseDto } from './createGroup.response.dto';
import {
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
} from 'src/api/openapi/decorators';

@Controller('api/groups')
export class CreateGroupController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  @ApiUnprocessableEntityResponse()
  @ApiBadRequestResponse()
  async handle(
    @Body() body: CreateGroupRequestDto,
  ): Promise<CreateGroupResponseDto> {
    const result = await this.commandBus.execute<
      CreateGroupCommand,
      Result<GroupId, BusinessRuleViolationError>
    >(
      new CreateGroupCommand({
        props: {
          ...body,
        },
      }),
    );

    return result.match(
      (groupId) => new CreateGroupResponseDto(groupId.value),
      (error) => {
        throw new BadRequestException(error.message);
      },
    );
  }
}
