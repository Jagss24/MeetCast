import React, { useState } from 'react'
import { MainStyled, CardStyled, HeadingWrapper, HeadingLogo, HeadingStyled, ButtonWrapper } from '../../shared/commonStyles/Card.styled'
import { TermStyled } from '../StepEmail/StepEmail.styled'
import { ImgInput, UploadText, ImageWrapper, ErrorStyled, Buttons, SkipStyled, GoBackStyled } from './StepAvatar.styled'
import { CgProfile } from "react-icons/cg";
import toast from 'react-hot-toast';

const StepAvatar = ({ setStep, data, setData, activateUser }) => {
    const [wrongImgType, setWrongImgType] = useState(false)

    const uploadImage = (e) => {
        const file = e.target.files[0]
        if ((file?.type === "image/png" || file?.type === "image/jpeg") && file?.size <= 5 * 1024 * 1024) {
            setWrongImgType(false)
            const reader = new FileReader();
            reader.onloadend = () => {
                setData((prev) => ({ ...prev, img: reader.result }))
            }
            reader.readAsDataURL(file)
        }
        else if (file?.type !== "image/png" && file?.type !== "image/jpeg") {
            setWrongImgType(true)
        }
        else if (file?.size > 5 * 1024 * 1024) {
            setWrongImgType(false)
            toast("File size should not exceed 5MB.");
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

