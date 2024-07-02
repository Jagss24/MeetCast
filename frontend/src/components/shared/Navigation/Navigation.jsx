import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navigation.styled.css"
import { HeadingImg } from '../commonStyles/Card.styled'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { logout } from '../../../api/api'
import { IoMdLogOut } from "react-icons/io";
import styled from 'styled-components'

const Navigation = () => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const { refetch: logoutRefetch } = useQuery({
        queryKey: ["user-logout"],
        queryFn: () => logout(),
        enabled: false
    })
    const handleLogout = () => {
        logoutRefetch()
        navigate("/")
    }
    return (
        <nav className={`navbar`}>
            <Link to="/" className="logo_wrapper" >
                <HeadingImg src='/images/logo.png' alt='logo' />
                <span>VoiceHub</span>
            </Link>
            {user?.userName && <UserComponent>
                <span>{user?.userName}</span>
                {user?.avatar ? <img src={user?.avatar} alt="user_pic" /> : <DummyImage>
                    <span>{user?.userName?.charAt(0).toUpperCase()}</span></DummyImage>}
                <IconComponent onClick={handleLogout}>
                    <IoMdLogOut />
                </IconComponent>
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
const IconComponent = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0077ff;
    &:hover{
        opacity: 0.8;
    }
`
const DummyImage = styled.span`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: red;
    span{
        font-size: 1.2rem;
    }
`

export default Navigation