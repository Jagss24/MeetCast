import OTPModal from './components/OTPModal';
import { Link } from 'react-router-dom';
import { MdOutlineMail } from 'react-icons/md';
import { ImPodcast } from 'react-icons/im';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import {
  MainStyled,
  CardStyled,
  HeadingStyled,
  HeadingWrapper,
  HeadingLogo,
  ButtonWrapper,
  TermStyled,
  InputStyled,
} from '@/components/shared/commonStyles/Card.styled';
import {
  FormStyled,
  InputWrapper,
} from '@/components/shared/Navigation/Navigation.styled';
import CircularIcon from '@/components/CircularIcon';
import { useRegister } from './hooks/useRegister';
import { FaKey, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Register = () => {
  const {
    functions: { handleEmailSubmission, handleGoogleRegister },
    mutations: { sendOtpMutation },
    states: {
      isOTPOpenModal,
      setIsOTPOpenModal,
      inputType,
      setInputType,
      password,
    },
  } = useRegister();

  console.log({ isOTPOpenModal, password });
  return (
    <>
      <MainStyled>
        <CardStyled>
          <HeadingWrapper>
            <HeadingLogo>
              <ImPodcast size={22} />
            </HeadingLogo>
            <HeadingStyled>Enter your Email Id</HeadingStyled>
          </HeadingWrapper>
          <FormStyled
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const emailId = formData.get('emailId');
              const password = formData.get('password');
              handleEmailSubmission({ emailId, password });
            }}>
            <InputWrapper>
              <span>
                <MdOutlineMail />
              </span>
              <InputStyled
                type='email'
                placeholder='yourmail@gmail.com'
                name='emailId'
              />
            </InputWrapper>
            <InputWrapper>
              <span>
                <FaKey />
              </span>
              <InputStyled
                type={inputType}
                placeholder='Enter your password'
                name='password'
              />
              <span
                className='icons'
                onClick={() =>
                  setInputType(inputType === 'password' ? 'text' : 'password')
                }>
                {inputType === 'password' ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </InputWrapper>
            <ButtonWrapper type='submit' disabled={sendOtpMutation?.isPending}>
              Next
              {sendOtpMutation?.isPending && (
                <CircularIcon width={12} height={12} color='#000' />
              )}
            </ButtonWrapper>
          </FormStyled>
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleGoogleRegister({ cred: credentialResponse?.credential })
            }
            onError={() => {
              toast.error('Some Error Occured while Login');
            }}
            theme='filled_white'
            logo_alignment='left'
            useOneTap
            shape='square'
            text='continue_with'
            use_fedcm_for_prompt={true}
          />
          <TermStyled>
            Already have an account?{' '}
            <Link
              to='/login'
              style={{ color: '#0077ff', textDecoration: 'none' }}>
              Login
            </Link>
          </TermStyled>
        </CardStyled>
      </MainStyled>

      {isOTPOpenModal && (
        <OTPModal
          handleClose={() => setIsOTPOpenModal(false)}
          password={password}
        />
      )}
    </>
  );
};

export default Register;
