import type { IUserData } from '../auth/autht.types';

interface IActivateResponseSchema {
  userData: IUserData;
}

interface IActivateSubmitSchema {
  userId: string;
  fullName?: string;
  userName: string;
  avatar: string;
}

export type { IActivateSubmitSchema, IActivateResponseSchema };
