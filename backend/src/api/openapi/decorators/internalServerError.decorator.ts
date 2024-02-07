import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponseOptions,
  ApiInternalServerErrorResponse as BaseResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { InternalServerErrorDto } from 'src/api/dtos/internalServerError.dto';

export const ApiInternalServerErrorResponse = (
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(InternalServerErrorDto),
    BaseResponse({
      description: 'Internal server error.',
      schema: {
        $ref: getSchemaPath(InternalServerErrorDto),
      },
      ...options,
    }),
  );
};
