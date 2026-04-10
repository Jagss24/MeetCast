import { get, post } from '@/lib/http';
import type {
  IAutoReLoginResponseSchema,
  IGoogleAuthResponseSchema,
  IGoogleAuthSubmitSchema,
  ILoginResponseSchema,
  ILoginSubmitSchema,
  ISendOTPResponseSchema,
  ISendOTPSubmitSchema,
  IVerifyOTPResponseSchema,
  IVerifyOTPSubmitSchema,
} from './autht.types';

const googleAuth = (data: IGoogleAuthSubmitSchema) =>
  post<IGoogleAuthResponseSchema, IGoogleAuthSubmitSchema>({
    url: 'authenticate/google',
    data,
  });

const sendOTP = (data: ISendOTPSubmitSchema) =>
  post<ISendOTPResponseSchema, ISendOTPSubmitSchema>({
    url: 'authenticate/register',
    data,
  });

const verifyOtp = (data: IVerifyOTPSubmitSchema) =>
  post<IVerifyOTPResponseSchema, IVerifyOTPSubmitSchema>({
    url: 'authenticate/verify-otp',
    data,
  });

const autoReLogin = () =>
  get<IAutoReLoginResponseSchema>({
    url: 'authenticate/auto-relogin',
  });

const loginUser = (data: ILoginSubmitSchema) =>
  post<ILoginResponseSchema, ILoginSubmitSchema>({
    url: 'authenticate/login',
    data,
  });

export { googleAuth, sendOTP, verifyOtp, autoReLogin, loginUser };
