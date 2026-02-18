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

interface IAutoReLoginResponseSchema {
  userData: IUserData;
}

interface IUserData {
  id: string;
  userName: string;
  fullName: string;
  activated: boolean;
  emailId: string;
  signedUpwithGoogle: boolean;
  about: string;
}
export type {
  IUserData,
  IGoogleAuthSubmitSchema,
  IGoogleAuthResponseSchema,
  ISendOTPSubmitSchema,
  ISendOTPResponseSchema,
  IVerifyOTPSubmitSchema,
  IVerifyOTPResponseSchema,
  IAutoReLoginResponseSchema,
};
