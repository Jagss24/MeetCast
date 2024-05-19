import React, { useState } from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingImg, ButtonWrapper } from "../../shared/commonStyles/Card.styled"
import "./StepPhoneEmail.styled.css"
const StepPhoneEmail = () => {
    const [number, setNumber] = useState(null)
    return (
        <MainStyled>
            <CardStyled>
                <HeadingWrapper>
                    <HeadingImg src='/images/tel.png'></HeadingImg>
                    <HeadingStyled>Enter your Phone number</HeadingStyled>
                </HeadingWrapper>
                <div className='inputBoxWrapper'>
                    <img src='/images/india.png' alt="india_logo" />
                    <input type="number" placeholder='8369198662' value={number} onChange={e => setNumber(e.target.value)} />
                </div>
                <ButtonWrapper>
                    Next
                    <img src='/images/arrow_forward.png' />
                </ButtonWrapper>
                <span className='terms'>By entering your number you are agreeing to our Terms of services and Privacy Policy Thanks!</span>
            </CardStyled>
        </MainStyled>

    )
}

export default StepPhoneEmail