import React, { useState } from 'react'
import { MainStyled, CardStyled, HeadingWrapper, HeadingLogo, HeadingStyled, ButtonWrapper } from '../../shared/commonStyles/Card.styled'
import { TermStyled } from '../StepEmail/StepEmail.styled'
import { ImgInput, UploadText, ImageWrapper, ErrorStyled, Buttons, SkipStyled, GoBackStyled } from './StepAvatar.styled'
import { CgProfile } from "react-icons/cg";

const StepAvatar = ({ setStep, data, user, setData, activateUser }) => {
    const [wrongImgType, setWrongImgType] = useState(false)

    const uploadImage = (e) => {
        const file = e.target.files[0]
        if (file?.type === "image/png" || file?.type === "image/jpeg") {
            setWrongImgType(false)
            const reader = new FileReader();
            reader.onloadend = () => {
                setData({ img: reader.result })
            }
            reader.readAsDataURL(file)
        }
        else {
            setWrongImgType(true)
        }
    }

    const handleGoBack = () => {
        setStep(1)
    }

    return (
        <>
            <MainStyled>
                <CardStyled>
                    <GoBackStyled onClick={handleGoBack}>Go back</GoBackStyled>
                    <SkipStyled onClick={() => activateUser()}>Skip</SkipStyled>
                    <HeadingWrapper>
                        <HeadingLogo src='/images/cool.png' style={{ width: "25px", height: "25px" }}></HeadingLogo>
                        <HeadingStyled>Okay, {data?.fullName} ! </HeadingStyled>
                    </HeadingWrapper>
                    <TermStyled>Let's upload your profile Pic</TermStyled>
                    <div>
                        <ImageWrapper>
                            {data?.img ? <ImgInput src={data?.img}></ImgInput> : <CgProfile size={50} />}
                        </ImageWrapper>
                        {wrongImgType && <ErrorStyled>Wrong image Type</ErrorStyled>}
                    </div>
                    <UploadText htmlFor="fileInput">
                        <input type="file" id="fileInput" onChange={uploadImage} style={{ display: "none" }} />
                        {data?.img ? "Choose another Pic" : "Upload your Pic"}
                    </UploadText>
                    <Buttons>
                        <ButtonWrapper disabled={!data?.img} onClick={() => activateUser()}>Next
                        </ButtonWrapper>
                    </Buttons>

                </CardStyled>
            </MainStyled>
        </>
    )
}

export default StepAvatar

