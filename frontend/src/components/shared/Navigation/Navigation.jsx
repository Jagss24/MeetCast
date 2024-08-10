import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavigationContainer, SearchInput, UserComponent, InputWrapper } from "./Navigation.styled.js"
import { HeadingImg } from '../commonStyles/Card.styled'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { logout } from '../../../api/api'
import DummyImage from "../../DummyImage"
import { FiSearch } from "react-icons/fi";


const Navigation = () => {
    const [{ user }, { isNavBarVisible }] = useSelector(state => [state.user, state.utility])
    const [showNavBar, setShowNavBar] = useState("")
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
        isNavBarVisible ? <NavigationContainer>
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
        </NavigationContainer> : <></>
    )

}

export default Navigation