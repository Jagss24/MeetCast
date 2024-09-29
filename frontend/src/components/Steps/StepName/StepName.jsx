import React from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingLogo, ButtonWrapper } from '../../shared/commonStyles/Card.styled'
import { InputStyled, TermStyled } from '../StepEmail/StepEmail.styled'
import { FaRegUser, FaRegKeyboard, FaKey } from "react-icons/fa";
import { InputWrapper } from '../../shared/Navigation/Navigation.styled';


const StepName = ({ setStep, data, setData, user }) => {

  const handleChange = e => {
    const { name, value } = e.target
    if (name === "password") {
      if (e.target.value.length > 12) {
        return
      }
    }
    if (name === "name") {
      if (e.target.value.length > 20) {
        return
      }
    }
    setData({ ...data, [name]: value })
  }

  const handleNext = () => {
    if (user?.signedUpwithGoogle) {
      if (!data.name) {
        toast("Pleaset set your UserName")
        return
      }
      setStep(2)
    }
    else {
      if ((!data.fullName || !data.name || !data.password)) {
        toast("Please fill all the details")
        return
      }
      setStep(2)
    }
  }

  return (
    <>
      <MainStyled>
        <CardStyled>
          <HeadingWrapper>
            <HeadingLogo src='/images/cool.png' style={{ width: "25px", height: "25px" }} />
            <HeadingStyled>Let's activate your account</HeadingStyled>
          </HeadingWrapper>
          {!user.signedUpwithGoogle && <InputWrapper>
            <span>
              <FaRegKeyboard />
            </span>
            <InputStyled placeholder="Enter your FullName" value={data.fullName} name="fullName" onChange={handleChange} />
          </InputWrapper>}
          <InputWrapper>
            <span>
              <FaRegUser />
            </span>
            <InputStyled placeholder="Set your username" value={data.name} name="name" onChange={handleChange} />
          </InputWrapper>
          {!user?.signedUpwithGoogle && <InputWrapper>
            <span>
              <FaKey />
            </span>
            <InputStyled placeholder="Enter your password" value={data.password} name="password" onChange={handleChange} />
          </InputWrapper>
          }
          <TermStyled>{user?.signedUpwithGoogle ? "Just your username and we’re all set to go!" : "Your Fullname, username & password, we’re all set to go!"}</TermStyled>
          <ButtonWrapper onClick={handleNext} disabled={!data}>
            Next
          </ButtonWrapper>
        </CardStyled>
      </MainStyled >
    </>
  )
}

export default StepName
