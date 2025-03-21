'use server';

import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { ok } from 'assert';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await sleep(2)
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return 'Success'

  } catch (error) {

    if ((error as any).type === 'CredentialsSignin') {
      return 'CredentialsSignIn'
    }

  }
  return 'something wrong happened'
}


export const login = async (email: string, password: string) => {
  try {

    await signIn('credentials', { email, password })

    return {
      ok: true,
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'An error ocurred'
    }
  }
}