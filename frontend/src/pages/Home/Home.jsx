import React from 'react'
import { MainStyled, CardStyled, HeadingStyled, HeadingWrapper, HeadingLogo, ButtonWrapper } from '../../components/shared/commonStyles/Card.styled'
import { Link, useNavigate } from 'react-router-dom'
import { ImPodcast } from "react-icons/im";
import { TermStyled } from '../../components/Steps/StepEmail/StepEmail.styled';

const Home = () => {
    const navigate = useNavigate()

    return (
        <MainStyled>
            <CardStyled>
                <HeadingWrapper>
                    <HeadingLogo>
                        <ImPodcast size={24} color='#20bd5f' />
                    </HeadingLogo>
                    <HeadingStyled>Welcome to MeetCast</HeadingStyled>
                </HeadingWrapper>
                <p className='sub'>A Platform where you can your share your opinions on your favorite topic and can listen on your favorite topic.</p>
                <ButtonWrapper onClick={() => navigate("/register")}>
                    Get Started
                    <img src='/images/arrow_forward.png' />
                </ButtonWrapper>
                <TermStyled>
                    Have an invite text? <Link style={{ color: "#0077ff", textDecoration: "none" }} to="/login">Login</Link>
                </TermStyled>

            </CardStyled>
        </MainStyled>

    )
}

export default Home