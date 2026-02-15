interface IGoogleAuthSubmitSchema {
  cred: string;
  mode: 'register' | 'login';
}

interface IGoogleAuthResponseSchema {
  accessToken: string;
}

interface ISendOTPSubmitSchema {
  emailId: string;
}

interface ISendOTPResponseSchema {
  emailId: string;
  hash: string;
}

interface IVerifyOTPSubmitSchema {
  otp: string;
  hash: string;
  emailId: string;
  password: string;
}

interface IVerifyOTPResponseSchema {
  accessToken: string;
}
export type {
  IGoogleAuthSubmitSchema,
  IGoogleAuthResponseSchema,
  ISendOTPSubmitSchema,
  ISendOTPResponseSchema,
  IVerifyOTPSubmitSchema,
  IVerifyOTPResponseSchema,
};
