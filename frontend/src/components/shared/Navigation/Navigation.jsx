import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavigationContainer, UserComponent } from "./Navigation.styled.js"
import { HeadingLogo } from '../commonStyles/Card.styled'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../api/api'
import DummyImage from "../../DummyImage"
import { useLocation } from 'react-router-dom'
import { setIsNavbarVisible } from '../../../slices/utilitySlice.js'
import { ImPodcast } from "react-icons/im";


const Navigation = () => {
    const [{ user }, { isNavBarVisible }] = useSelector(state => [state.user, state.utility])
    const dispatch = useDispatch();
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
    const location = useLocation()
    useEffect(() => {
        const pathName = location.pathname.split("/")[1]
        if (pathName !== "room") {
            dispatch(setIsNavbarVisible(true))
            return
        }
    }, [location.pathname])
    return (
        isNavBarVisible ? <NavigationContainer>
            <Link to="/" className="logo_wrapper" >
                <HeadingLogo>
                    <ImPodcast color='#20bd5f' />
                </HeadingLogo>
                <span>VoiceHub</span>
            </Link>

            {user?.userName && <UserComponent >
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