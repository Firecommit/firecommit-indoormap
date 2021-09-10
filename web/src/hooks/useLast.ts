import rfdc from 'rfdc';

export const useLast = (value: any) => {
  const clone = rfdc();

  return clone(value);
};
