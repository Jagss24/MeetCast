import React, { useState, useEffect } from 'react';
import StepName from "../../components/Steps/StepName/StepName"
import StepAvatar from '../../components/Steps/StepAvatar/StepAvatar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { activate } from '../../api/api';
import { setUser } from '../../slices/userSlice';
import AppLoader from '../../AppLoader';

const steps = {
    1: StepName,
    2: StepAvatar
}

const Activate = () => {
    const [step, setStep] = useState(1)
    const [userActivated, setUserActivated] = useState(false)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: activatedData, mutate, isSuccess, isPending, isError } = useMutation({
        mutationKey: ["acivate-api"],
        mutationFn: activate,
    })
    const [data, setData] = useState({
        fullName: user?.fullName,
        name: "",
        password: "",
        img: user?.avatar
    })
    const Step = steps[step]

    const activateUser = () => {
        mutate({
            userId: user?.id,
            userName: data.name,
            fullName: data.fullName,
            password: data.password,
            avatar: data.img
        })
    }


    useEffect(() => {
        if (isSuccess) {
            if (activatedData?.data?.userData) {
                dispatch(setUser(activatedData?.data?.userData))
                setUserActivated(true)
            }
            else {
                alert("No user Found")
                return
            }
        }
        if (isError) {
            return alert("Some internal server Error")
        }
    }, [isSuccess || isError || activatedData])

    useEffect(() => {
        if (userActivated) {
            navigate("/rooms")
        }
    }, [userActivated])

    if (isPending) {
        return <AppLoader />
    }
    return (
        <>
            <Step setStep={setStep} data={data} setData={setData} user={user} activateUser={activateUser} />
        </>
    )
}

export default Activate