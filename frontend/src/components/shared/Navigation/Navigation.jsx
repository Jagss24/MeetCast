import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Navigation.styled.css"
import { HeadingImg } from '../commonStyles/Card.styled'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../slices/userSlice'
import { getUSer } from '../../../api/api'
import styled from 'styled-components'

const Navigation = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('user');
    const { data, refetch } = useQuery({
        queryKey: [userId],
        queryFn: () => getUSer(userId),
        retry: 0,
        enabled: false,
    });

    useEffect(() => {
        if (userId !== user?.id && userId) {
            refetch()

        }
    }, [window.location.search, user?.id])

    useEffect(() => {
        if (data) {
            if (data?.data?.message === "Not Found") {
                window.location.assign("/");
            }
            else {
                dispatch(setUser(data?.data?.userData))
            }
        }
    }, [data])

    return (
        <nav className={`navbar container`}>
            <Link to="/" className="logo_wrapper" >
                <HeadingImg src='/images/logo.png' alt='logo' />
                <span>VoiceHub</span>
            </Link>
            {user?.avatar && <UserComponent>
                <span>{user?.name}</span>
                <img src={user?.avatar} alt="user_pic" />
            </UserComponent>}
        </nav>

    )
}

const UserComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    span{
        font-weight: normal;
    }
`


export default Navigation