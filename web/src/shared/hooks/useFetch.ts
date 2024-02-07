import {
  createApiClient,
  isBadRequestError,
  isForbiddenError,
  isInternalServerError,
} from "@/shared/utils/api/apiClient";
import {
  ExactPathByHttpMethod,
  ExactHttpMethodByPath,
  ApiPathParam,
  ApiResponse,
  ApiErrorResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestErrorResponse,
  ApiForbiddenErrorResponse,
} from "@/shared/utils/api/baseTypes";
import { useState, useCallback } from "react";

type FetchHttpMethod = "get";
type FetchPath = ExactPathByHttpMethod<FetchHttpMethod>;

type ExactFetchMethod<T extends FetchPath> = FetchHttpMethod & ExactHttpMethodByPath<T>;

type UseFetchOption<T extends FetchPath, U extends ExactFetchMethod<T>> = {
  path: T;
  httpMethod: U;
  params?: {
    paths?: ApiPathParam<T, U>;
  };
  onSuccess?: (response: ApiResponse<T, U>) => void;
  onBadRequestError?: (error: ApiBadRequestErrorResponse) => void;
  onForbiddenError?: (error: ApiForbiddenErrorResponse) => void;
  onInternalServerError?: (error: ApiInternalServerErrorResponse) => void;
  onUnexpectedError?: (error: unknown) => void;
};

export const useFetch = <T extends FetchPath, U extends ExactFetchMethod<T>>({
  path,
  httpMethod,
  params,
  onSuccess,
  onBadRequestError,
  onForbiddenError,
  onInternalServerError,
  onUnexpectedError,
}: UseFetchOption<T, U>) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [response, setResponse] = useState<ApiResponse<T, U>>();
  const [error, setError] = useState<ApiErrorResponse>();

  const sendRequest = useCallback(async () => {
    const api = createApiClient({
      path,
      httpMethod,
      params: { paths: params?.paths },
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
  }, [
    path,
    httpMethod,
    params?.paths,
    onUnexpectedError,
    error,
    onSuccess,
    onBadRequestError,
    onForbiddenError,
    onInternalServerError,
  ]);

  return { sendRequest, response, error, isRequesting };
};
