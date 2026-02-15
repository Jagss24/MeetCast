import OTPModal from './components/OTPModal';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useRegister } from './hooks/useRegister';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import UiCard from '@/components/ui/UiCard';
import UiTextInput from '@/components/ui/UiTextInput';
import UiButton from '@/components/ui/UiButton';
import { KeyRound, Mail, Podcast } from 'lucide-react';

const Register = () => {
  const {
    functions: { handleEmailSubmission, handleGoogleRegister },
    mutations: { sendOtpMutation },
    states: { isOTPOpenModal, setIsOTPOpenModal, password },
  } = useRegister();

  return (
    <UIPageWrapper classname='flex items-center justify-center'>
      <UiCard
        className='w-96 rounded-md'
        headingIcon={<Podcast className='size-6' />}
        headerTitle='Create your new account'>
        <section className='mt-4 flex flex-col gap-4 w-full'>
          <form
            className='flex flex-col items-center justify-center gap-4'
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const emailId = formData.get('emailId') as string;
              const password = formData.get('password') as string;
              if (!emailId || !password) {
                toast('Please enter all details');
                return;
              }
              handleEmailSubmission({ emailId, password });
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
              Already have an account?{' '}
              <Link to='/login' className='text-uiBlue '>
                Login
              </Link>
            </span>
            <UiButton
              type='submit'
              isLoading={sendOtpMutation?.isPending}
              text='Next'
              className='px-4 h-8 focus:ring-2 focus:ring-success'
            />
          </form>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse?.credential)
                handleGoogleRegister(credentialResponse?.credential);
            }}
            onError={() => {
              toast.error('Some Error Occured while Login');
            }}
            theme={'filled_white' as any} // filled_white is expected but was still giving me ts error so wrote any
            logo_alignment='left'
            useOneTap
            shape='square'
            text='continue_with'
            use_fedcm_for_prompt={true}
          />
        </section>
      </UiCard>

      {isOTPOpenModal && (
        <OTPModal
          handleClose={() => setIsOTPOpenModal(false)}
          password={password}
        />
      )}
    </UIPageWrapper>
  );
};

export default Register;
