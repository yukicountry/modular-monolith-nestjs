import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponseOptions,
  ApiUnprocessableEntityResponse as BaseResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UnprocessableEntityDto } from 'src/api/dtos/unprocessableEntity.dto';

export const ApiUnprocessableEntityResponse = (
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(UnprocessableEntityDto),
    BaseResponse({
      description: 'Validation error.',
      schema: {
        $ref: getSchemaPath(UnprocessableEntityDto),
      },
      ...options,
    }),
  );
};
