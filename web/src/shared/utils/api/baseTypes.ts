import { components, paths } from "@/generated/openapi.schema";
import type { UnionToIntersection } from "type-fest";

export type ApiPaths = keyof paths;

export type HttpMethods = keyof UnionToIntersection<paths[keyof paths]>;

export type ExactHttpMethodByPath<T extends ApiPaths> = HttpMethods &
  keyof UnionToIntersection<paths[T]>;

export type ExactPathByHttpMethod<U extends HttpMethods> = U extends unknown
  ? keyof {
      [K in keyof paths as paths[K] extends Record<U, unknown> ? K : never]: paths[K];
    }
  : never;

type GetNestedValue<
  T extends Record<string, any>,
  Keys extends (string | number)[],
> = 0 extends Keys["length"]
  ? T
  : Keys extends [infer First, ...infer Rest]
    ? First extends keyof T
      ? Rest extends (string | number)[]
        ? GetNestedValue<Required<T[First]>, Rest>
        : never
      : never
    : never;

type GetContent<T extends ApiPaths, U extends HttpMethods, R extends number> = GetNestedValue<
  paths,
  [T, U, "responses", R, "content", "application/json"]
>;

export const httpSuccessStatusCode = [200, 201, 204] as const;

export type HttpSuccessCode = (typeof httpSuccessStatusCode)[number];

export type ApiResponse<T extends ApiPaths, U extends HttpMethods> = GetContent<
  T,
  U,
  HttpSuccessCode
>;

export type ApiErrorResponse =
  | ApiBadRequestErrorResponse
  | ApiForbiddenErrorResponse
  | ApiValidationErrorResponse
  | ApiInternalServerErrorResponse;

export type ApiBadRequestErrorResponse = GetNestedValue<
  components,
  ["schemas", "BadRequestResponseDto"]
>;

export type ApiForbiddenErrorResponse = GetNestedValue<components, ["schemas", "ForbiddenDto"]>;

export type ApiValidationErrorResponse = GetNestedValue<
  components,
  ["schemas", "UnprocessableEntityDto"]
>;

export type ApiInternalServerErrorResponse = GetNestedValue<
  components,
  ["schemas", "InternalServerErrorDto"]
>;
// export type ApiBadRequestErrorResponse<T extends ApiPaths, U extends HttpMethods> = GetContent<
//   T,
//   U,
//   400
// >;

// export type ApiForbiddenErrorResponse<T extends ApiPaths, U extends HttpMethods> = GetContent<
//   T,
//   U,
//   403
// >;

// export type ApiValidationErrorResponse<T extends ApiPaths, U extends HttpMethods> = GetContent<
//   T,
//   U,
//   422
// >;

// export type ApiInternalServerErrorResponse<T extends ApiPaths, U extends HttpMethods> = GetContent<
//   T,
//   U,
//   500
// >;

export const httpErrorStatusCodes = [400, 422] as const;

export type HttpErrorCode = (typeof httpErrorStatusCodes)[number];

// schemaにエラーレスポンスが定義されている場合はその型を、そうでない場合は {message: string}型をdataに当てはめる
// export type ApiErrorWithErrorCode<
//   T extends ApiPaths,
//   U extends HttpMethods,
//   R extends HttpErrorCode,
// > = R extends number // ここで型変数Codeを条件分岐にかけることによってユニオン型を得られるようにする（union distribution）
//   ? GetContent<T, U, R> extends never
//     ? {
//         status: R;
//         data: {
//           message: string;
//         };
//       }
//     : {
//         status: R;
//         data: GetContent<T, U, R>;
//       }
//   : never;

// export type ApiError<T extends ApiPaths, U extends HttpMethods> = ApiErrorWithErrorCode<
//   T,
//   U,
//   HttpErrorCode
// >;

// export type ApiValidationError<T extends ApiPaths, U extends HttpMethods> = ApiErrorWithErrorCode<
//   T,
//   U,
//   422
// >;

export type ApiPathParam<T extends ApiPaths, U extends HttpMethods> = GetNestedValue<
  paths,
  [T, U, "parameters", "path"]
>;

export type ApiQueryParam<T extends ApiPaths, U extends HttpMethods> = GetNestedValue<
  paths,
  [T, U, "parameters", "query"]
>;

export type ApiJsonBody<T extends ApiPaths, U extends HttpMethods> = GetNestedValue<
  paths,
  [T, U, "requestBody", "content", "application/json"]
>;
