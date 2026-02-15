import { post } from '@/lib/http';
import type {
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

export { googleAuth, sendOTP, verifyOtp };
