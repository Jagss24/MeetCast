import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImPodcast } from "react-icons/im";
import styled from 'styled-components';

const Home = () => {
    const navigate = useNavigate()

    return (<>
        <UpperContainer>
            <div></div>
        </UpperContainer>
        <HomeWrapper>
            <section className='mainLogo'>
                <p>
                    <ImPodcast size={48} />
                    <span>
                        MeetCast
                    </span>
                </p>
            </section>
            <section className='description'>
                <p>Combines the idea of meetings and podcasts.</p>
            </section>

            <section className='about'>
                <p>Connect, chat, and share in your own meeting or podcast space. Public or private, it’s your call!</p>
            </section>
            <button onClick={() => navigate("/login")}>Get Started</button>

        </HomeWrapper>
        <BottomContainer>
            <div></div>
        </BottomContainer>
    </>


    )
}

export default Home

const UpperContainer = styled.div`
    position: absolute;
    top: -10rem;
    left:-30rem;
    right:0;
    z-index: -10;
    filter: blur(64px);
    overflow: hidden;
    &> div{
        position: relative; 
        left: calc(50% - 11rem); 
        width: 60.125rem; 
        aspect-ratio: 1155 / 678; 
        transform: translateX(-50%) rotate(30deg); 
        background: linear-gradient(to top right, #ff80b5, #9089fc);
        opacity: 0.3; 
        clip-path: polygon(
            74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 
            60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 
            0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%
        ); /* The clip-path style */

    }
`

const BottomContainer = styled.div`
    position: absolute;
    bottom: 0rem;
    right:0rem;
    z-index: -10;
    filter: blur(64px);
    overflow: hidden;
    &> div{
        position: relative; 
        left: calc(50% - 11rem); 
        width: 60.125rem; 
        aspect-ratio: 1155 / 678; 
        transform: translateX(-50%) rotate(30deg); 
        background: linear-gradient(to top right, #ff80b5, #9089fc);
        opacity: 0.3; 
        clip-path: polygon(
            74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 
            60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 
            0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%
        ); /* The clip-path style */

    }`
const HomeWrapper = styled.div`
    height: 90vh;
    width: 100%;
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    gap: 1rem;
    z-index: 99;
    .mainLogo{
        z-index: 90;
        p{
            display: flex;
            justify-content:center;
            align-items:center;
            gap: 1rem;
            span{
                font-size: 2.5rem;
                font-weight: 600;
            }
        }
    }
    .description{
        text-align:center;
        width: 60%;
        font-weight: 600;
        p{
            font-size: 2rem;
        }
    }
    .about{
        text-align:center;
        width: 60%;
        p{
            font-size: 1.75rem;
        }
    }
    button{
        background-color: var(--button-color);
        padding: 0.8rem 1rem;
        border: none;
        outline: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        &:hover{
            opacity: 0.9;

        }
       
    
    }
`

// const HomeUpper = styled.div`
//   position: absolute;
//   top: 0;
//   left: 50%;
//   width: 100vw;
//   height: 100%;
//   transform: translateX(-50%) rotate(30deg);
//   z-index: -1;
//   clip-path: polygon(
//     74.1% 44.1%,
//     100% 61.6%,
//     97.5% 26.9%,
//     85.5% 0.1%,
//     80.7% 2%,
//     72.5% 32.5%,
//     60.2% 62.4%,
//     52.4% 68.1%,
//     47.5% 58.3%,
//     45.2% 34.5%,
//     27.5% 76.7%,
//     0.1% 64.9%,
//     17.9% 100%,
//     27.6% 76.8%,
//     76.1% 97.7%,
//     74.1% 44.1%
//   );

//   @media (min-width: 640px) {
//     width: 72.1875rem;
//   }

//   /* Use a pseudo-element for the blur and background */
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     opacity: 0.3;
//     background-image: linear-gradient(to top right, #ff80b5, #9089fc);
//   }
// `;

