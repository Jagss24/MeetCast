import React, { useEffect, useRef, useState } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingImg, ButtonWrapper } from "../../shared/commonStyles/Card.styled"
import { TermStyled } from '../StepPhoneEmail/StepPhoneEmail.styled'
import { OTPBox, OTPWrapper } from './StepOtp.styled'
import { useSelector, useDispatch } from 'react-redux'
import { verifyOtpMobile } from '../../../hooks/useOtp'
import { SpinningCircles } from 'react-loading-icons'
import { setUser } from '../../../slices/userSlice'

const StepOtp = () => {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const dispatch = useDispatch()
  const { otp, user } = useSelector(state => state.user)
  const [currentFocus, setCurrentFocus] = useState(0);
  const inputRefs = useRef([
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]);
  const handleChange = (value, idx) => {
    if (Number.isInteger(+value) && +value < 10) {
      // If there is empty str like "" it will still be true.
      const newInputs = [...inputs];
      newInputs[idx] = value;
      setInputs(newInputs);
      if (value !== "" && idx + 1 < inputs.length) setCurrentFocus(idx + 1);
    }
  };

  const handleSubmit = () => {
    refetch()
  }

  const { data, isSuccess, refetch, isFetching } = verifyOtpMobile(inputs.join(""), otp.hash, otp.number)

  useEffect(() => {
    inputRefs.current[currentFocus]?.current?.focus();
  }, [currentFocus]);



  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data?.data?.userData))
    }
  }, [isSuccess])

  return (
    <>
      <MainStyled>
        <CardStyled>
          <HeadingWrapper>
            <HeadingImg src='/images/lock.png' style={{ width: "20px", height: "25px" }}></HeadingImg>
            <HeadingStyled>Enter the code we just texted you</HeadingStyled>
          </HeadingWrapper>
          <OTPWrapper className='inputBoxWrapper'>
            <div style={{ alignSelf: "center" }}>
              {inputs.map((value, i) => (
                <OTPBox
                  autoFocus={i === 0}
                  type="text"
                  key={i}
                  value={value}
                  ref={inputRefs.current[i]}
                  disabled={i !== currentFocus}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && i > 0 && inputs[i] === "") {
                      setCurrentFocus(i - 1);
                    }
                  }}
                  onChange={(e) => handleChange(e.target.value, i)}
                />
              ))}
            </div>
            <TermStyled>Didn't receive the code? Tap to resend</TermStyled>
          </OTPWrapper>
          <ButtonWrapper disabled={inputs.includes("")} onClick={handleSubmit}>
            Next
            {isFetching && <SpinningCircles speed={2} width={20} height={20} />}
            <img src='/images/arrow_forward.png' />

          </ButtonWrapper>
        </CardStyled>
      </MainStyled>
    </>
  )
}

export default StepOtp