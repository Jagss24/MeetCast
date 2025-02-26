import { useEffect } from 'react';
import {
  ButtonWrapper,
  TermStyled,
} from '@/components/shared/commonStyles/Card.styled';
import { OTPBox, OTPWrapper } from '../styles/OTPModal.styled';
import CircularIcon from '@/components/CircularIcon';
import { FormStyled } from '@/components/shared/Navigation/Navigation.styled';
import { useOTPModal } from '../hooks/useOTPModal';
import UiModal from '@/ui/UiModal';

const OTPModal = ({ handleClose, password }) => {
  const {
    states: { inputs, currentFocus },
    refs: { inputRefs },
    functions: { handleSubmit, handleChange },
    mutations: { verifyOtpMutation },
  } = useOTPModal({ handleClose });

  useEffect(() => {
    inputRefs.current[currentFocus]?.current?.focus();
  }, [currentFocus]);

  return (
    <UiModal headingText='Enter the code we just texted you!!!'>
      <FormStyled
        style={{
          marginTop: '1rem',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ password });
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
    </UiModal>
  );
};

export default OTPModal;
