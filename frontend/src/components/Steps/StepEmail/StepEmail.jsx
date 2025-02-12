import React from 'react';
import {
  MainStyled,
  CardStyled,
  HeadingStyled,
  HeadingWrapper,
  HeadingLogo,
  ButtonWrapper,
} from '../../shared/commonStyles/Card.styled';
import { TermStyled, InputStyled } from './StepEmail.styled';
import { Link } from 'react-router-dom';
import {
  FormStyled,
  InputWrapper,
} from '../../shared/Navigation/Navigation.styled';
import { MdOutlineMail } from 'react-icons/md';
import { ImPodcast } from 'react-icons/im';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import CircularIcon from '../../CircularIcon';
import { useStepEmail } from './hooks/useStepEmail';

const StepEmail = ({ setStep }) => {
  const {
    functions: { handleEmailSubmission, handleGoogleRegister },
    mutations: { sendOtpMutation },
  } = useStepEmail({ setStep });

  return (
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
            handleEmailSubmission({ emailId });
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
  );
};

export default StepEmail;
