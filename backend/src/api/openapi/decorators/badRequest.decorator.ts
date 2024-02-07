import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse as BaseResponse,
  ApiExtraModels,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { BadRequestResponseDto } from 'src/api/dtos/badRequest.dto';

export const ApiBadRequestResponse = (options?: ApiResponseOptions) => {
  return applyDecorators(
    ApiExtraModels(BadRequestResponseDto),
    BaseResponse({
      description: 'Bad request.',
      schema: {
        $ref: getSchemaPath(BadRequestResponseDto),
      },
      ...options,
    }),
  );
};
