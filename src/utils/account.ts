import * as shortUUID from 'short-uuid';

export const generateAccountNumber = (): string => {
  const translator = shortUUID();

  return translator.new().toString().toUpperCase();
};
