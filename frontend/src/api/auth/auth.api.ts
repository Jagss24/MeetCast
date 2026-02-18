import { get, post } from '@/lib/http';
import type {
  IAutoReLoginResponseSchema,
  IGoogleAuthResponseSchema,
  IGoogleAuthSubmitSchema,
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
    url: 'authenticate/sendOtp',
    data,
  });

const verifyOtp = (data: IVerifyOTPSubmitSchema) =>
  post<IVerifyOTPResponseSchema, IVerifyOTPSubmitSchema>({
    url: 'authenticate/verifyOtp',
    data,
  });

const autoReLogin = () =>
  get<IAutoReLoginResponseSchema>({
    url: 'authenticate/autoReLogin',
  });

export { googleAuth, sendOTP, verifyOtp, autoReLogin };
