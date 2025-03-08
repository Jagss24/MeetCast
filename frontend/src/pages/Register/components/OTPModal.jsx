import { useEffect } from 'react';
import { useOTPModal } from '../hooks/useOTPModal';
import UiModal from '@/components/ui/UiModal';
import UiButton from '@/components/ui/UiButton';

const OTPModal = ({ handleClose, password }) => {
  const {
    states: { inputs, currentFocus, setCurrentFocus },
    refs: { inputRefs },
    functions: { handleSubmit, handleChange },
    mutations: { verifyOtpMutation },
  } = useOTPModal({ handleClose });

  useEffect(() => {
    inputRefs.current[currentFocus]?.current?.focus();
  }, [currentFocus]);

  return (
    <UiModal headingText='OTP Verification'>
      <p className='text-center text-base my-4'>
        Enter the code we just texted you!!!
      </p>
      <form
        className='flex flex-col items-center gap-2 mt-4'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ password });
        }}>
        <div className='flex items-center justify-center gap-2'>
          {inputs.map((value, i) => {
            const isDiabled = value ? false : i > currentFocus;
            return (
              <input
                className='size-12 rounded bg-white text-primary p-4 outline-none disabled:cursor-not-allowed disabled:brightness-90'
                autoFocus={i === 0}
                type='text'
                key={i}
                value={value}
                ref={inputRefs.current[i]}
                disabled={isDiabled}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && i > 0 && inputs[i] === '') {
                    setCurrentFocus(i - 1);
                  }
                }}
                onChange={(e) => handleChange(e.target.value, i)}
              />
            );
          })}
        </div>
        <span className='text-gray font-semibold text-center text-xs mt-2'>
          Didn't receive the code? Tap to resend
        </span>
        <UiButton
          type='submit'
          disabled={inputs.includes('')}
          isLoading={verifyOtpMutation?.isPending}
          text='Verify'
          className='px-6 h-8 mb-4'
        />
      </form>
    </UiModal>
  );
};

export default OTPModal;
