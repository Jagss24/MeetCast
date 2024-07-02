import React, { useState, useEffect } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingImg, ButtonWrapper } from "../../shared/commonStyles/Card.styled"
import { TermStyled, InputBoxStyled, InputStyled } from "./StepEmail.styled"
import { setOtp } from '../../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { SpinningCircles } from 'react-loading-icons';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { sendOtp } from '../../../api/api';
const StepEmail = ({ setStep }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")

    const handleEmailSubmission = () => {
        mutate({
            emailId: email
        })
    }

    const { data, mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["send-otp"],
        mutationFn: sendOtp,
    })

    useEffect(() => {
        if (isSuccess) {
            dispatch(setOtp({ emailId: data?.data.emailId, hash: data?.data.hash }))
            setStep(2)
        }
    }, [isSuccess])

    return (
        <MainStyled>
            <CardStyled>
                <HeadingWrapper>
                    <HeadingImg src='/images/msg.png' style={{ width: "25px", height: "20px" }}></HeadingImg>
                    <HeadingStyled>Enter your Email Id</HeadingStyled>
                </HeadingWrapper>
                <InputBoxStyled className='inputBoxWrapper'>
                    <InputStyled type="email" placeholder='yourmail@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />
                </InputBoxStyled>
                <ButtonWrapper onClick={handleEmailSubmission}>
                    Next
                    {isPending && <SpinningCircles speed={2} width={16} height={16} />}

                </ButtonWrapper>
                <TermStyled>Already have an account? <Link to="/login" style={{ color: "#0077ff", textDecoration: "none" }}>Login</Link></TermStyled>
            </CardStyled>
        </MainStyled>
    )
}

export default StepEmail