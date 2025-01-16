import { defineUserSignupFields } from 'wasp/auth/providers/types';

export const getEmailUserFields = defineUserSignupFields({
  name: (data: any) => data.name,
  email: (data: any) => data.email,
});
