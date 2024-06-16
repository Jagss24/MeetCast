import React, { useEffect, useState } from 'react'
import { MainStyled, CardStyled, HeadingWrapper, HeadingImg, HeadingStyled, ButtonWrapper } from '../../shared/commonStyles/Card.styled'
import { TermStyled } from '../StepPhoneEmail/StepPhoneEmail.styled'
import { ImgInput, BlueLineText, ImageWrapper, ErrorStyled, Buttons, ActivationStyled } from './StepAvatar.styled'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import { activate } from '../../../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { Bars } from 'react-loading-icons';
import { setUser } from '../../../slices/userSlice';
import { CgProfile } from "react-icons/cg";

const StepAvatar = ({ setStep }) => {
    const savedName = sessionStorage.getItem("userName")
    const [img, setImg] = useState("")
    const [wrongImgType, setWrongImgType] = useState(false)

    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { data, isFetching, refetch, isSuccess } = useQuery({
        queryKey: ["acivate-api"],
        queryFn: () => activate({ name: savedName, userId: user?.id, avatar: img }),
        enabled: false
    })
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
        sessionStorage.removeItem("userName")
        setStep(1)
    }
    const handleNext = () => {
        if (savedName && user?.id && img) {
            refetch()
        }
    }
    useEffect(() => {
        setStep(2)
    }, [savedName])

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(data?.data?.userData))
            sessionStorage.removeItem("userName")
        }
    }, [isSuccess])
    return (
        <>
            {!isFetching ? (<MainStyled>
                <CardStyled>
                    <HeadingWrapper>
                        <HeadingImg src='/images/cool.png' style={{ width: "25px", height: "25px" }}></HeadingImg>
                        <HeadingStyled>Okay {savedName} ! </HeadingStyled>
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
                        <ButtonWrapper onClick={handleGoBack}>
                            <FaArrowLeft />Go Back
                        </ButtonWrapper>
                        <ButtonWrapper disabled={!img} onClick={handleNext}>Next
                            <FaArrowRight />
                        </ButtonWrapper>
                    </Buttons>

                </CardStyled>
            </MainStyled>) : (
                <MainStyled>
                    <CardStyled>
                        <ActivationStyled>
                            <p>Activation in Progress</p>
                            <Bars speed={1} width={50} height={50} />
                        </ActivationStyled>

                    </CardStyled>
                </MainStyled>)}
        </>
    )
}

export default StepAvatar

