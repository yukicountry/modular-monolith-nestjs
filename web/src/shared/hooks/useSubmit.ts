import {
  createApiClient,
  isBadRequestError,
  isForbiddenError,
  isInternalServerError,
  isValidationError,
} from "@/shared/utils/api/apiClient";
import {
  HttpMethods,
  ExactPathByHttpMethod,
  ExactHttpMethodByPath,
  ApiPathParam,
  ApiResponse,
  ApiJsonBody,
  ApiErrorResponse,
  ApiValidationErrorResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestErrorResponse,
  ApiForbiddenErrorResponse,
} from "@/shared/utils/api/baseTypes";
import { useState, useCallback } from "react";

type SubmitHttpMethod = Exclude<HttpMethods, "get">;
type SubmitPath = ExactPathByHttpMethod<SubmitHttpMethod>;

type ExactSubmitMethod<T extends SubmitPath> = SubmitHttpMethod & ExactHttpMethodByPath<T>;

type UseSubmitOption<T extends SubmitPath, U extends ExactSubmitMethod<T>> = {
  path: T;
  httpMethod: U;
  params?: {
    paths?: ApiPathParam<T, U>;
  };
  onSuccess?: (response: ApiResponse<T, U>) => void;
  onBadRequestError?: (error: ApiBadRequestErrorResponse) => void;
  onForbiddenError?: (error: ApiForbiddenErrorResponse) => void;
  onValidationError?: (error: ApiValidationErrorResponse) => void;
  onInternalServerError?: (error: ApiInternalServerErrorResponse) => void;
  onUnexpectedError?: (error: unknown) => void;
};

export const useSubmit = <T extends SubmitPath, U extends ExactSubmitMethod<T>>({
  path,
  httpMethod,
  params,
  onSuccess,
  onBadRequestError,
  onForbiddenError,
  onValidationError,
  onInternalServerError,
  onUnexpectedError,
}: UseSubmitOption<T, U>) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [response, setResponse] = useState<ApiResponse<T, U>>();
  const [error, setError] = useState<ApiErrorResponse>();

  const sendRequest = useCallback(
    async (body?: ApiJsonBody<T, U>) => {
      const api = createApiClient({
        path,
        httpMethod,
        params: { paths: params?.paths, body },
      });

      setIsRequesting(true);

      try {
        const response = await api.sendRequest();

        if (response.isOk()) {
          setResponse(response.value);
          onSuccess?.(response.value);
          return;
        }

        const expectedError = response.error;
        setError(expectedError);

        if (isBadRequestError(expectedError)) {
          onBadRequestError?.(expectedError);
          return;
        } else if (isForbiddenError(expectedError)) {
          onForbiddenError?.(expectedError);
          return;
        } else if (isValidationError(expectedError)) {
          onValidationError?.(expectedError);
          return;
        } else if (isInternalServerError(expectedError)) {
          onInternalServerError?.(expectedError);
          return;
        }

        onUnexpectedError?.(error);
      } catch (error) {
        onUnexpectedError?.(error);
      } finally {
        setIsRequesting(false);
      }
    },
    [
      path,
      httpMethod,
      params?.paths,
      onUnexpectedError,
      error,
      onSuccess,
      onBadRequestError,
      onForbiddenError,
      onValidationError,
      onInternalServerError,
    ],
  );

  return { sendRequest, response, error, isRequesting };
};
