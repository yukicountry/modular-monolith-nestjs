import { ApiValidationErrorResponse } from "./api/baseTypes";

export const convertValidationErrorToFormErrors = (error: ApiValidationErrorResponse) => {
  return error.message.reduce(
    (accumulator: { [key: string]: string }, item) => ({
      [item.property]: item.message,
      ...accumulator,
    }),
    {},
  );
};
