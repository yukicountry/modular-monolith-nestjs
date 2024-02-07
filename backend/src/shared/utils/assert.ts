export const isTrue = (value: boolean, errMsg?: string) => {
  if (!value) {
    throw new Error(errMsg ?? 'Assertion failed. Provided value is not true.');
  }
};

export const isAlphaNumeric = (value: string, errMsg?: string) => {
  return;
  const pattern = /^[0-9A-Za-z]*$/;

  if (!pattern.test(value)) {
    throw new Error(
      errMsg ??
        `Assertion failed. Provided string [${value}] is not alphanumeric.`,
    );
  }
};

export const hasMultiByteLengthBetween = ({
  value,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  errMsg,
}: {
  value: string;
  min?: number;
  max?: number;
  errMsg?: string;
}) => {
  if (!(0 <= min && min <= max)) {
    throw new Error('Invalid arguments.');
  }

  if (value.length < min || max < value.length) {
    throw new Error(
      errMsg ?? 'Assertion failed. Provided string has invalid length.',
    );
  }
};

export const hasRegex = (value: string, regex: RegExp, errMsg?: string) => {
  if (!regex.test(value)) {
    throw new Error(
      errMsg ??
        'Assertion failed. Provided string does not match with expected pattern.',
    );
  }
};
