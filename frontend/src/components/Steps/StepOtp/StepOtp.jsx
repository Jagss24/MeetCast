import React, { useEffect, useRef, useState } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingImg, ButtonWrapper } from "../../shared/commonStyles/Card.styled"
import { TermStyled } from '../StepPhoneEmail/StepPhoneEmail.styled'
import { OTPBox, OTPWrapper } from './StepOtp.styled'

const StepOtp = () => {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [currentFocus, setCurrentFocus] = useState(0);
  const inputRefs = useRef([
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]);

  const handleChange = (value, idx) => {
    if (Number.isInteger(+value) && +value < 10) {
      // If there is empty str like "" it will stil be true.
      const newInputs = [...inputs];
      newInputs[idx] = value;
      setInputs(newInputs);
      if (value !== "" && idx + 1 < inputs.length) setCurrentFocus(idx + 1);
    }
  };

  useEffect(() => {
    inputRefs.current[currentFocus]?.current?.focus();
  }, [currentFocus]);
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
          <ButtonWrapper disabled={inputs.includes("")} onClick={() => console.log(inputs.join(""))}>
            Next
            <img src='/images/arrow_forward.png' />
          </ButtonWrapper>
        </CardStyled>
      </MainStyled>
    </>
  )
}

export default StepOtp