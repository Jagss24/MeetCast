import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavigationContainer, UserComponent } from "./Navigation.styled.js"
import { HeadingLogo } from '../commonStyles/Card.styled'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../api/api.js'
import DummyImage from "../../DummyImage"
import { useLocation } from 'react-router-dom'
import { setIsNavbarVisible } from '../../../slices/utilitySlice.js'
import { ImPodcast } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";


const Navigation = () => {
    const { user } = useSelector(state => state.user)
    const { isNavBarVisible } = useSelector(state => state.utility)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { refetch: logoutRefetch, isSuccess, data } = useQuery({
        queryKey: ["user-logout"],
        queryFn: () => logout(),
        enabled: false
    })
    const handleLogout = () => {
        logoutRefetch()
        window.location.reload()
    }
    const location = useLocation()
    useEffect(() => {
        const pathName = location.pathname.split("/")[1]
        if (pathName !== "room") {
            dispatch(setIsNavbarVisible(true))
            return
        }
    }, [location.pathname])

    useEffect(() => {
        if (data?.data?.message === "User Logged out") {
            window.location.reload()
        }
    }, [isSuccess])
    return (
        isNavBarVisible ? <NavigationContainer>
            <Link to="/" className="logo_wrapper" >
                <HeadingLogo>
                    <ImPodcast style={{ color: "var(--button-color)" }} />
                </HeadingLogo>
                <span>MeetCast</span>
            </Link>

            {user?.userName && <UserComponent onClick={() => {
                const userModal = document.querySelector(".user-modal")
                if (userModal.classList.contains("open"))
                    userModal.classList.remove("open")
                else {
                    userModal.classList.add('open')
                }
            }}>
                <div >
                    {user?.avatar ? <img src={user?.avatar} alt="user_pic" referrerPolicy='no-referrer' /> : <DummyImage
                        width={40} height={40}
                        userName={user?.userName?.charAt(0).toUpperCase()} />}
                </div>
                <div className="user-modal">
                    {!window.location.pathname.includes("profile") && < p onClick={() => navigate(`/profile/${user?.userName}`)}>View Profile
                        <span><FaUserCircle /></span>
                    </p>}
                    <p onClick={() => handleLogout()}>Logout
                        <span><IoLogOutOutline /></span>
                    </p>
                </div>
            </UserComponent>}
        </NavigationContainer > : <></>
    )

}

export default Navigation