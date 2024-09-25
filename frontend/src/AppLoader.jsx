import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ImPodcast } from "react-icons/im";

const AppLoader = () => {
    return (
        <FullScreenLoader aria-label='loading'>
            <div>
                <span className='logo'>
                    <ImPodcast color='#20bd5f' size={"100%"} />
                </span>
                <h4>VoiceHub</h4>
            </div>
            <span className='loader' />
        </FullScreenLoader>
    )
}

export default AppLoader

const loadingAnimation = keyframes`
    0% {
        left: -50%;
    }
    100% {
        left: 100%;
    }
`;

const FullScreenLoader = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &> div{
        display: flex;
        span{
            display: inline-block;
            width: 2.5rem;
            height: 2.5rem;
        }
        h4{
            margin-left: 0.5rem;
            font-size:1.3rem;
        }
    }
    
    .loader{
        display: inline-block;
        background: transparent;
        width: 200px;
        height: 4px;
        position: relative;
        overflow-x: hidden;
        margin-top: 0.8rem;
         &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        width: 50%;
        background-color: #20bd5f;
        animation: ${loadingAnimation} 2s linear infinite;
    }
}
`