import React, { useEffect, useState } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, ButtonWrapper, HeadingLogo } from '../../components/shared/commonStyles/Card.styled'
import { InputStyled, TermStyled } from '../../components/Steps/StepEmail/StepEmail.styled'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query"
import { loginUser } from '../../api/api'
import { SpinningCircles } from 'react-loading-icons';
import { useDispatch } from 'react-redux'
import { setUser } from '../../slices/userSlice'
import { InputWrapper } from '../../components/shared/Navigation/Navigation.styled'
import { ImPodcast } from 'react-icons/im'
import { MdOutlineMailOutline, MdKey } from "react-icons/md";

const Login = () => {
  const [data, setData] = useState({
    emailId: "",
    password: ""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const { data: userData, mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: loginUser
  })

  const handleLogin = () => {
    if (!data.emailId || !data.password) {
      alert("Field all the details")
      return
    }
    mutate({
      emailId: data?.emailId,
      password: data?.password
    })
  }
  useEffect(() => {
    console.log()
    if (userData?.data?.userDtos) {
      dispatch(setUser(userData?.data?.userDtos))
      navigate("/rooms")
    }
  }, [isSuccess])

  return (
    <MainStyled>
      <CardStyled>
        <HeadingWrapper>
          <HeadingLogo>
            <ImPodcast size={22} />
          </HeadingLogo>
          <HeadingStyled>Login into your account</HeadingStyled>
        </HeadingWrapper>
        <InputWrapper>
          <span>
            <MdOutlineMailOutline />
          </span>
          <InputStyled placeholder="Enter your email" value={data.emailId} name="emailId" onChange={handleChange} />
        </InputWrapper>
        <InputWrapper>
          <span>
            <MdKey />
          </span>
          <InputStyled placeholder="Enter your password" value={data.password} name="password" onChange={handleChange} />
        </InputWrapper>
        <TermStyled>Don't have an account? <Link to="/register" style={{ color: "rgb(0, 119, 255)", textDecoration: "none" }}>Create one</Link></TermStyled>
        <ButtonWrapper disabled={isPending} onClick={handleLogin}>
          Login
          {isPending && <SpinningCircles speed={2} width={16} height={16} />}
        </ButtonWrapper>
      </CardStyled>
    </MainStyled >
  )
}

export default Login
