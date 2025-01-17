import React, { useEffect, useState } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, ButtonWrapper, HeadingLogo } from '../../components/shared/commonStyles/Card.styled'
import { InputStyled, TermStyled } from '../../components/Steps/StepEmail/StepEmail.styled'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { loginUser, googleAuth } from '../../api/api'
import { useDispatch } from 'react-redux'
import { setUser } from '../../slices/userSlice'
import { InputWrapper } from '../../components/shared/Navigation/Navigation.styled'
import { ImPodcast } from 'react-icons/im'
import { MdOutlineMailOutline, MdKey } from "react-icons/md";
import { GoogleLogin } from "@react-oauth/google"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast'
import CircularIcon from '../../components/CircularIcon'

const Login = () => {
  const [data, setData] = useState({
    emailId: "",
    password: ""
  })
  const [inputType, setInputType] = useState("password")
  const [cred, setCred] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const queryClient = useQueryClient()
  const { data: userData, refetch, isFetching } = useQuery({
    queryKey: ['login-user'],
    queryFn: () => loginUser(data),
    enabled: false
  })

  const { data: googleData, refetch: gooleRefetch } = useQuery({
    queryKey: ["login-user-google"],
    queryFn: () => googleAuth({ cred, mode: "login" }),
    enabled: false,
    retry: 0,
  })
  const handleLogin = () => {
    if (!data.emailId || !data.password) {
      toast("Fill all the details")
      return
    }
    refetch();
    setData({
      emailId: "",
      password: ""
    })
  }

  useEffect(() => {
    if (cred) {
      gooleRefetch()
      setCred("")
    }
  }, [cred])
  useEffect(() => {
    if (userData?.data?.userDtos) {
      queryClient.removeQueries({ queryKey: ['login-user-google'] })
      dispatch(setUser(userData?.data?.userDtos))
      navigate("/rooms")
    }
    else if (userData?.data?.message === "No user found") {
      queryClient.removeQueries({ queryKey: ['login-user-google'] })
      toast.error(userData?.data?.message)
      return
    }
    else if (userData?.data?.message === "Please Login with Google") {
      queryClient.removeQueries({ queryKey: ['login-user-google'] })
      toast.error(userData?.data?.message)
      return
    }
  }, [userData])

  useEffect(() => {
    if (googleData?.data?.userDtos) {
      queryClient.removeQueries({ queryKey: ['login-user'] })
      dispatch(setUser(googleData?.data?.userDtos))
      navigate("/rooms")
    } else if (googleData?.data?.message === "No user found") {
      queryClient.removeQueries({ queryKey: ['login-user'] })
      toast.error(googleData?.data?.message)
      return
    }
  }, [googleData])

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["login-user-google"], exact: true });
      queryClient.removeQueries({ queryKey: ["login-user"], exact: true })
    };
  }, []);


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
          <InputStyled type={inputType} placeholder="Enter your password" value={data.password} name="password" onChange={handleChange} />
          <span className='icons' onClick={() => setInputType(inputType === "password" ? "text" : "password")}>
            {inputType === "password" ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </InputWrapper>
        <TermStyled>Don't have an account? <Link to="/register" style={{ color: "rgb(0, 119, 255)", textDecoration: "none" }}>Create one</Link></TermStyled>
        <ButtonWrapper disabled={isFetching} onClick={handleLogin}>
          Login
          {isFetching && <CircularIcon width={12} height={12} color="#000" />}
        </ButtonWrapper>

        <GoogleLogin
          onSuccess={credentialResponse =>
            setCred(credentialResponse?.credential)
          }
          onError={() => {
            toast.error("Some Error Occured while Login")
          }}
          theme='filled_white'
          logo_alignment='left'
          useOneTap
        />
      </CardStyled>
    </MainStyled >
  )
}

export default Login
