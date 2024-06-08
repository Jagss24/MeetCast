import React, { useState, useEffect } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingImg, ButtonWrapper } from '../../shared/commonStyles/Card.styled'
import { InputStyled, TermStyled } from '../StepPhoneEmail/StepPhoneEmail.styled'

const StepName = ({ setStep }) => {
  const [name, setName] = useState("")
  const savedName = sessionStorage.getItem("userName")
  const handleNext = () => {
    sessionStorage.setItem("userName", name)
    setStep(2)
  }

  useEffect(() => {
    if (savedName) {
      setStep(2)
    }

  }, [savedName])
  return (
    <>
      <MainStyled>
        <CardStyled>
          <HeadingWrapper>
            <HeadingImg src='/images/cool.png' style={{ width: "25px", height: "25px" }}></HeadingImg>
            <HeadingStyled>Introduce yourself!</HeadingStyled>
          </HeadingWrapper>
          <InputStyled placeholder="What's your name?" value={name} onChange={e => setName(e.target.value)}></InputStyled>
          <TermStyled>Your full name, and we’re all set to go!</TermStyled>
          <ButtonWrapper onClick={handleNext} disabled={!name}>
            Next
            <img src='/images/arrow_forward.png' />
          </ButtonWrapper>
        </CardStyled>
      </MainStyled >
    </>
  )
}

export default StepName