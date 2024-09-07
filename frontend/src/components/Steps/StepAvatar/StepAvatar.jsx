import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainStyled, CardStyled, HeadingWrapper, HeadingLogo, HeadingStyled, ButtonWrapper } from '../../shared/commonStyles/Card.styled'
import { TermStyled } from '../StepEmail/StepEmail.styled'
import { ImgInput, BlueLineText, ImageWrapper, ErrorStyled, Buttons, ActivationStyled, SkipStyled } from './StepAvatar.styled'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { CgProfile } from "react-icons/cg";

const StepAvatar = ({ setStep }) => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [img, setImg] = useState("")
    const [wrongImgType, setWrongImgType] = useState(false)


    const uploadImage = (e) => {
        const file = e.target.files[0]
        if (file?.type === "image/png" || file?.type === "image/jpeg") {
            setWrongImgType(false)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result);
            }
            reader.readAsDataURL(file)
        }
        else {
            setWrongImgType(true)
        }
    }

    const handleGoBack = () => {
    }
    const handleNext = () => {
    }

    return (
        <>
            <MainStyled>
                <CardStyled>
                    <SkipStyled onClick={() => navigate("/rooms")}>Skip</SkipStyled>
                    <HeadingWrapper>
                        <HeadingLogo src='/images/cool.png' style={{ width: "25px", height: "25px" }}></HeadingLogo>
                        <HeadingStyled>Okay {user?.fullName} ! </HeadingStyled>
                    </HeadingWrapper>
                    <TermStyled>Let's upload your profile Pic</TermStyled>
                    <div>
                        <ImageWrapper>
                            {img ? <ImgInput src={img}></ImgInput> : <CgProfile size={50} />}
                        </ImageWrapper>
                        {wrongImgType && <ErrorStyled>Wrong image Type</ErrorStyled>}
                    </div>
                    <BlueLineText htmlFor="fileInput">
                        <input type="file" id="fileInput" onChange={uploadImage} style={{ display: "none" }} />
                        {img ? "Choose another Pic" : "Upload your Pic"}
                    </BlueLineText>
                    <Buttons>
                        <ButtonWrapper disabled={!img} onClick={handleNext}>Next
                            <FaArrowRight />
                        </ButtonWrapper>
                    </Buttons>

                </CardStyled>
            </MainStyled>
        </>
    )
}

export default StepAvatar

