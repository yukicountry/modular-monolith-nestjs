import { axios } from "@/shared/utils/axios";
import { isAxiosError } from "axios";
import { Result, err, ok } from "neverthrow";
import {
  ApiBadRequestErrorResponse,
  ApiErrorResponse,
  ApiForbiddenErrorResponse,
  ApiInternalServerErrorResponse,
  ApiJsonBody,
  ApiPathParam,
  ApiPaths,
  ApiQueryParam,
  ApiResponse,
  ApiValidationErrorResponse,
  HttpMethods,
} from "./baseTypes";

type CreateApiClientOption<T extends ApiPaths, U extends HttpMethods> = {
  path: T;
  httpMethod: U;
  params?: {
    paths?: ApiPathParam<T, U>;
    query?: ApiQueryParam<T, U>;
    body?: ApiJsonBody<T, U>;
  };
};

export const createApiClient = <T extends ApiPaths, U extends HttpMethods>(
  option: CreateApiClientOption<T, U>,
) => {
  const path = () => {
    // {trial_uid} などとなっているpathを実際の値に変換する
    const fullPath = Object.entries(option.params?.paths ?? {}).reduce(
      (prev, [key, value]) => prev.replace(new RegExp(`\\{${key}\\}`), String(value)),
      option.path as string,
    );

    const searchParam = new URLSearchParams();
    Object.entries(option.params?.query ?? {}).forEach(([key, value]) => {
      if (typeof value === "string") {
        searchParam.set(key, value);
      }
    });

    if (searchParam.toString().length > 0) {
      return fullPath + "?" + searchParam.toString();
    } else {
      return fullPath;
    }
  };

  const sendRequest = async (): Promise<Result<ApiResponse<T, U>, ApiErrorResponse>> => {
    try {
      const response = await axios.request<ApiResponse<T, U>>({
        method: option.httpMethod,
        url: path(),
        data: option.params?.body,
      });
      return ok(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response != null) {
        return err(error.response.data);
      }
      throw error;
    }
  };

  return { path: path(), sendRequest };
};

export const isBadRequestError = (error: ApiErrorResponse): error is ApiBadRequestErrorResponse => {
  return error.statusCode === 400;
};

export const isValidationError = (error: ApiErrorResponse): error is ApiValidationErrorResponse => {
  return error.statusCode === 422;
};

export const isForbiddenError = (error: ApiErrorResponse): error is ApiForbiddenErrorResponse => {
  return error.statusCode === 403;
};

export const isInternalServerError = (
  error: ApiErrorResponse,
): error is ApiInternalServerErrorResponse => {
  return error.statusCode === 500;
};
