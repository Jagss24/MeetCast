import React from 'react';
import { Link } from 'react-router-dom';
import { ImPodcast } from 'react-icons/im';
import { MdOutlineMailOutline, MdKey } from 'react-icons/md';
import { GoogleLogin } from '@react-oauth/google';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import {
  MainStyled,
  CardStyled,
  HeadingStyled,
  HeadingWrapper,
  ButtonWrapper,
  HeadingLogo,
  InputStyled,
  TermStyled,
} from '@/components/shared/commonStyles/Card.styled';
import {
  InputWrapper,
  FormStyled,
} from '@/components/shared/Navigation/Navigation.styled';
import CircularIcon from '@/components/CircularIcon';
import { useLogin } from './hooks/useLogin';

const Login = () => {
  const {
    states: { inputType, setInputType },
    functions: { handleLogin, handleGoogleLogin },
    mutations: { loginMutation },
  } = useLogin();

  return (
    <MainStyled>
      <CardStyled>
        <HeadingWrapper>
          <HeadingLogo>
            <ImPodcast size={22} />
          </HeadingLogo>
          <HeadingStyled>Login into your account</HeadingStyled>
        </HeadingWrapper>
        <FormStyled
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const emailId = formData.get('emailId');
            const password = formData.get('password');
            handleLogin({ emailId, password });
          }}>
          <InputWrapper>
            <span>
              <MdOutlineMailOutline />
            </span>
            <InputStyled placeholder='Enter your email' name='emailId' />
          </InputWrapper>
          <InputWrapper>
            <span>
              <MdKey />
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

          <TermStyled>
            Don't have an account?{' '}
            <Link
              to='/register'
              style={{ color: 'rgb(0, 119, 255)', textDecoration: 'none' }}>
              Create one
            </Link>
          </TermStyled>
          <ButtonWrapper type='submit' disabled={loginMutation?.isPending}>
            Login
            {loginMutation?.isPending && (
              <CircularIcon width={12} height={12} color='#000' />
            )}
          </ButtonWrapper>
        </FormStyled>
        <GoogleLogin
          onSuccess={(credentialResponse) =>
            handleGoogleLogin(credentialResponse?.credential)
          }
          onError={() => {
            toast.error('Some Error Occured while Login');
          }}
          theme='filled_white'
          logo_alignment='left'
          useOneTap
        />
      </CardStyled>
    </MainStyled>
  );
};

export default Login;
