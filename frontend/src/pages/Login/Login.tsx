import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useLogin } from './hooks/useLogin';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import UiCard from '@/components/ui/UiCard';
import UiButton from '@/components/ui/UiButton';
import UiTextInput from '@/components/ui/UiTextInput';
import { KeyRound, Mail, Podcast } from 'lucide-react';
import { handleErrorToast } from '@/lib/toasts';

const Login = () => {
  const {
    functions: { handleLogin, handleGoogleLogin },
    mutations: { loginMutation },
  } = useLogin();

  return (
    <UIPageWrapper classname='flex items-center justify-center'>
      <UiCard
        className='w-96 rounded-md'
        headingIcon={<Podcast className='size-6' />}
        titleClassName=''
        headerTitle='Login into your account'>
        <section className='mt-4 flex flex-col gap-4 w-full'>
          <form
            className='flex flex-col items-center justify-center gap-4'
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const emailId = formData.get('emailId') as string;
              const password = formData.get('password') as string;
              if (!emailId || !password) {
                handleErrorToast('Please fill all the details');
                return;
              }
              handleLogin({ emailId, password });
            }}>
            <UiTextInput
              name='emailId'
              placeholder='Enter your email'
              icon={<Mail className='size-4 text-success' />}
              label='Email:'
            />
            <UiTextInput
              name='password'
              placeholder='Enter your password'
              icon={<KeyRound className='size-4 text-success' />}
              label='Password:'
            />
            <span className='text-gray text-xs font-semibold'>
              Don't have an account?{' '}
              <Link to='/register' className='text-uiBlue '>
                Create one
              </Link>
            </span>
            <UiButton
              type='submit'
              isLoading={loginMutation?.isPending}
              text='Login'
              className='px-4 h-8 focus:ring-2 focus:ring-success'
            />
          </form>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential)
                handleGoogleLogin(credentialResponse?.credential);
            }}
            onError={() => {
              toast.error('Some Error Occured while Login');
            }}
            theme={'filled_white' as any} // excepting filled_white but google login was still giving type error so wrote any
            logo_alignment='left'
            useOneTap
          />
        </section>
      </UiCard>
    </UIPageWrapper>
  );
};

export default Login;
