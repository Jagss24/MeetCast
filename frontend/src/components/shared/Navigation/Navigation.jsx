import React from 'react'
import { Link } from 'react-router-dom'
import "./Navigation.styled.css"
import { HeadingImg } from '../commonStyles/Card.styled'

const Navigation = () => {
    return (
        <nav className={`navbar container`}>
            <Link to="/" className="logo_wrapper" >
                <HeadingImg src='/images/logo.png' alt='logo' />
                <span>VoiceHub</span>
            </Link>
        </nav>

    )
}

export default Navigation