export const initialOptions = [
  { placeholder: "6 hrs", value: 6 },
  { placeholder: "12 hrs", value: 12 },
  { placeholder: "24 hrs", value: 24 },
  { placeholder: "48 hrs", value: 48 },
];

export const initialError = {
  value: "",
  inValid: false,
  msg: "Alias must be at least 5 alphanumeric characters",
};

export const initialUpdateOptions = [
  ...initialOptions,
  { placeholder: "no expiry", value: 0 },
];

export const initialUpdateErrors = {
  alias: {
    msg: "Alias must be at least 5 alphanumeric characters",
    invalid: false,
  },
  pin: { msg: "PIN length must be between 4 to 10 digits", invalid: false },
};
