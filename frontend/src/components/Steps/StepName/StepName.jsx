import React, { useState, useEffect } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingLogo, ButtonWrapper } from '../../shared/commonStyles/Card.styled'
import { InputStyled, TermStyled } from '../StepEmail/StepEmail.styled'
import { useMutation } from '@tanstack/react-query';
import { activate } from "../../../api/api"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from '../../../slices/userSlice';
import { FaRegUser, FaRegKeyboard, FaKey } from "react-icons/fa";
import { InputWrapper } from '../../shared/Navigation/Navigation.styled';
import { useNavigate } from 'react-router-dom';


const StepName = ({ setStep }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const [data, setData] = useState({
    fullName: "",
    name: "",
    password: ""
  })
  const activateUser = () => {
    if (user.signedUpwithGoogle) {
      if (!data.name) {
        alert("Pleaset set your UserName")
        return
      }
    }
    else {
      if ((!data.fullName || !data.name || !data.password)) {
        alert("Please fill all the details")
        return
      }
    }
    mutate({
      userId: user?.id,
      userName: data.name,
      fullName: data.fullName,
      password: data.password
    })
  }
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

  const { data: activatedData, mutate, isSuccess, isPending, isError } = useMutation({
    mutationKey: ["acivate-api"],
    mutationFn: activate,
  })

  useEffect(() => {
    if (user?.activated && user?.signedUpwithGoogle) {
      setStep(2)
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      if (activatedData?.data?.signedUpwithGoogle) {
        dispatch(setUser(activatedData?.data?.userData))
        navigate("/rooms")
      }
      else {
        dispatch(setUser(activatedData?.data?.userData))
        setStep(2)
      }
    }
    if (isError) {
      return alert("Your account is already activated")
    }
  }, [isSuccess || isError])

  return (
    <>
      <MainStyled>
        <CardStyled>
          <HeadingWrapper>
            <HeadingLogo src='/images/cool.png' style={{ width: "25px", height: "25px" }}></HeadingLogo>
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
          <TermStyled>{user?.signedUpwithGoogle ? "Just your username and we’re all set to go!" : "Your username & password, we’re all set to go!"}</TermStyled>
          <ButtonWrapper onClick={activateUser} disabled={!data}>
            Next
            <img src='/images/arrow_forward.png' />
          </ButtonWrapper>
        </CardStyled>
      </MainStyled >
    </>
  )
}

export default StepName
