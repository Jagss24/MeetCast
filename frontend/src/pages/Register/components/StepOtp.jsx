import { useEffect } from 'react';
import {
  MainStyled,
  CardStyled,
  HeadingStyled,
  HeadingWrapper,
  HeadingLogo,
  ButtonWrapper,
} from '@/components/shared/commonStyles/Card.styled';
import { TermStyled } from '../styles/StepEmail.styled';
import { OTPBox, OTPWrapper } from '../styles/StepOtp.styled';
import CircularIcon from '@/components/CircularIcon';
import { FormStyled } from '@/components/shared/Navigation/Navigation.styled';
import { useStepOtp } from '../hooks/useStepOtp';

const StepOtp = () => {
  const {
    states: { inputs, currentFocus },
    refs: { inputRefs },
    functions: { handleSubmit, handleChange },
    mutations: { verifyOtpMutation },
  } = useStepOtp();

  useEffect(() => {
    inputRefs.current[currentFocus]?.current?.focus();
  }, [currentFocus]);

  return (
    <>
      <MainStyled>
        <CardStyled>
          <HeadingWrapper>
            <HeadingLogo
              src='/images/lock.png'
              style={{ width: '20px', height: '25px' }}></HeadingLogo>
            <HeadingStyled>Enter the code we just texted you</HeadingStyled>
          </HeadingWrapper>
          <FormStyled
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <OTPWrapper>
              <div style={{ alignSelf: 'center' }}>
                {inputs.map((value, i) => (
                  <OTPBox
                    autoFocus={i === 0}
                    type='text'
                    key={i}
                    value={value}
                    ref={inputRefs.current[i]}
                    disabled={i !== currentFocus}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && i > 0 && inputs[i] === '') {
                        setCurrentFocus(i - 1);
                      }
                    }}
                    onChange={(e) => handleChange(e.target.value, i)}
                  />
                ))}
              </div>
              <TermStyled>Didn't receive the code? Tap to resend</TermStyled>
            </OTPWrapper>
            <ButtonWrapper
              type='submit'
              disabled={inputs.includes('') || verifyOtpMutation?.isPending}>
              Next
              {verifyOtpMutation?.isPending && (
                <CircularIcon width={12} height={12} color='#000' />
              )}
            </ButtonWrapper>
          </FormStyled>
        </CardStyled>
      </MainStyled>
    </>
  );
};

export default StepOtp;
