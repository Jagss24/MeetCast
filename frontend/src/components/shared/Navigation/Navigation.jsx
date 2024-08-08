import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavigationContainer, SearchInput, UserComponent, InputWrapper } from "./Navigation.styled.js"
import { HeadingImg } from '../commonStyles/Card.styled'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { logout } from '../../../api/api'
import DummyImage from "../../DummyImage"
import styled from 'styled-components'
import { FiSearch } from "react-icons/fi";


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
        <NavigationContainer>
            <Link to="/" className="logo_wrapper" >
                <HeadingImg src='/images/logo.png' alt='logo' />
                <span>VoiceHub</span>
            </Link>

            {user?.userName && <UserComponent >
                <InputWrapper >
                    <SearchInput type="text" placeholder="Type here / to search" />
                    <span>
                        <FiSearch />
                    </span>
                </InputWrapper>
                <div onClick={() => navigate(`/profile/${user?.userName}`)}>
                    {user?.avatar ? <img src={user?.avatar} alt="user_pic" /> : <DummyImage
                        width={40} height={40}
                        userName={user?.userName?.charAt(0).toUpperCase()} />}
                </div>
            </UserComponent>}
        </NavigationContainer>

    )
}


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
export default Navigation