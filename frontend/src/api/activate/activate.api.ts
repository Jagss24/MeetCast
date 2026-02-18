import { post } from '@/lib/http';
import type {
  IActivateResponseSchema,
  IActivateSubmitSchema,
} from './activate.type';

const activateUser = (data: IActivateSubmitSchema) =>
  post<IActivateResponseSchema, IActivateSubmitSchema>({
    url: 'authenticate/activate',
    data,
  });

export { activateUser };
