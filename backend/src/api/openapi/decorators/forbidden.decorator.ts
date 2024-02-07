import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse as BaseResponse,
  ApiExtraModels,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ForbiddenDto } from 'src/api/dtos/forbidden.dto';

export const ApiForbiddenResponse = (options?: ApiResponseOptions) => {
  return applyDecorators(
    ApiExtraModels(ForbiddenDto),
    BaseResponse({
      description: 'Forbidden.',
      schema: {
        $ref: getSchemaPath(ForbiddenDto),
      },
      ...options,
    }),
  );
};
