import React, { useState, useEffect } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingLogo, ButtonWrapper } from "../../shared/commonStyles/Card.styled"
import { TermStyled, InputStyled } from "./StepEmail.styled"
import { setOtp, setUser } from '../../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sendOtp, googleAuth } from '../../../api/api';
import { InputWrapper } from '../../shared/Navigation/Navigation.styled';
import { MdOutlineMail } from 'react-icons/md';
import { ImPodcast } from 'react-icons/im';
import { GoogleLogin } from "@react-oauth/google"
import toast from 'react-hot-toast';
import CircularIcon from '../../CircularIcon';

const StepEmail = ({ setStep }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [email, setEmail] = useState("")
    const [cred, setCred] = useState("")

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["send-otp"],
        mutationFn: sendOtp,
    })
    const handleEmailSubmission = async () => {
        const { data } = await mutateAsync({
            emailId: email
        })
        if (data?.message) {
            toast(data?.message)
            return
        } else if (data?.emailId) {
            dispatch(setOtp({ emailId: data?.emailId, hash: data?.hash }))
            setStep(2)
        }
    }

    const { data: googleData, refetch: gooleRefetch } = useQuery({
        queryKey: ["signup-user-google"],
        queryFn: () => googleAuth({ cred, mode: "register" }),
        enabled: false,
        retry: 0,
    })

    useEffect(() => {
        if (cred) {
            gooleRefetch()
            setCred("")
        }
    }, [cred])

    useEffect(() => {
        if (googleData?.data?.userData) {
            dispatch(setUser(googleData?.data?.userData))
            navigate("/activate")
        } else if (googleData?.data?.message) {
            toast(googleData?.data?.message)
        }
    }, [googleData])

    useEffect(() => {
        return () => {
            queryClient.removeQueries({ queryKey: ["signup-user-google"] })
        }
    }, [])

    return (
        <MainStyled>
            <CardStyled>
                <HeadingWrapper>
                    <HeadingLogo>
                        <ImPodcast size={22} />
                    </HeadingLogo>
                    <HeadingStyled>Enter your Email Id</HeadingStyled>
                </HeadingWrapper>
                <InputWrapper>
                    <span>
                        < MdOutlineMail />
                    </span>
                    <InputStyled type="email" placeholder='yourmail@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />
                </InputWrapper>
                <ButtonWrapper onClick={handleEmailSubmission} disabled={isPending}>
                    Next
                    {isPending && <CircularIcon width={12} height={12} color='#000' />}

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
                    shape='square'
                    text="continue_with"
                    use_fedcm_for_prompt={true}
                />
                <TermStyled>Already have an account? <Link to="/login" style={{ color: "#0077ff", textDecoration: "none" }}>Login</Link></TermStyled>
            </CardStyled>
        </MainStyled>
    )
}

export default StepEmail