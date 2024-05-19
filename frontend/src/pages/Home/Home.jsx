import React from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingImg, ButtonWrapper } from '../../components/shared/commonStyles/Card.styled'
import "./Home.styled.css"
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <MainStyled>
            <CardStyled>
                <HeadingWrapper>
                    <HeadingImg src='/images/logo.png'></HeadingImg>
                    <HeadingStyled>Welcome to VoiceHub</HeadingStyled>
                </HeadingWrapper>
                <p className='sub'>A Platform where you can your share your opinions on your favorite topic and can listen on your favorite topic.</p>
                <ButtonWrapper onClick={() => navigate("/register")}>
                    Get Started
                    <img src='/images/arrow_forward.png' />
                </ButtonWrapper>
                <div className="links">
                    Have an invite text? <Link className='sign-in' to="/login">Sign in</Link>
                </div>
            </CardStyled>
        </MainStyled>

    )
}

export default Home