import React, { useState, useEffect } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingImg, ButtonWrapper } from "../../shared/commonStyles/Card.styled"
import { TermStyled, InputBoxStyled, InputStyled, EmailPhoneWrapper } from "./StepPhoneEmail.styled"
import { CiMobile1 } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { sendOtpMobile } from '../../../hooks/useOtp';
import { setOtp } from '../../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SpinningCircles } from 'react-loading-icons';
const StepPhoneEmail = ({ setStep }) => {
    const dispatch = useDispatch()
    const { otp } = useSelector(state => state.user)
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")
    const [isPhoneActive, setIsPhoneActive] = useState(true)
    const handlePhoneSubmission = async () => {
        refetch()
    }
    const handleEmailSubmission = () => {

        // setStep(2)   
    }

    const { data, refetch, isFetching, isSuccess } = sendOtpMobile(number)

    useEffect(() => {
        if (isSuccess) {
            dispatch(setOtp({ number: data?.data.number, hash: data?.data.hash }))
            setStep(2)
        }
    }, [isSuccess])

    return (
        <>
            <EmailPhoneWrapper>
                <CiMobile1 size={24} style={{
                    background: isPhoneActive ? "#0077ff" : "#262626", borderRadius: "8px", padding: "4px",
                    cursor: "pointer"
                }} onClick={() => setIsPhoneActive(prev => !prev)} />
                <AiOutlineMail size={24} style={{
                    background: isPhoneActive ? "#262626" : "#0077ff", borderRadius: "8px", padding: "4px",
                    cursor: "pointer"
                }} onClick={() => setIsPhoneActive(prev => !prev)} />
            </EmailPhoneWrapper>
            {isPhoneActive ?
                <MainStyled>
                    <CardStyled>
                        <HeadingWrapper>
                            <HeadingImg src='/images/tel.png' style={{ width: "25px", height: "25px" }}></HeadingImg>
                            <HeadingStyled>Enter your Phone number</HeadingStyled>
                        </HeadingWrapper>
                        <InputBoxStyled>
                            <img src='/images/india.png' alt="india_logo" />
                            <InputStyled type="number" placeholder='8369198662' value={number} onChange={e => setNumber(e.target.value)} />
                        </InputBoxStyled>
                        <ButtonWrapper onClick={handlePhoneSubmission}>
                            Next
                            {isFetching && <SpinningCircles speed={2} width={20} height={20} />}
                            <img src='/images/arrow_forward.png' />
                        </ButtonWrapper>
                        <TermStyled>By entering your number you are agreeing to our Terms of services and Privacy Policy Thanks!</TermStyled>
                    </CardStyled>
                </MainStyled> :
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
                            <img src='/images/arrow_forward.png' />
                        </ButtonWrapper>
                        <TermStyled>By entering your number you are agreeing to our Terms of services and Privacy Policy Thanks!</TermStyled>
                    </CardStyled>
                </MainStyled>}
        </>

    )
}

export default StepPhoneEmail