import React, { useState } from 'react'
import { useWebRTC } from '../../hooks/useWebRtc'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdOutlineScreenShare, MdCallEnd, MdOutlineStopScreenShare } from "react-icons/md";
import { DummyImage } from '../../components/shared/Navigation/Navigation'

const Room = () => {
    const { id: roomId } = useParams()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const { clients, provideRef, screenSharing, handleVideo, leaveRoom, handleAudio } = useWebRTC(roomId, user)
    const { startScreenSharing, stopScreenSharing } = screenSharing()
    const [isAudioOn, setIsAudioOn] = useState(false)
    const [isVideoOn, setIsVideoOn] = useState(false)
    const [screenIsSharing, setscreenIsSharing] = useState(false)
    console.log({ clients })
    return (
        <RoomConatiner>
            <div>Room</div>
            <VideoContainer>
                {
                    clients.map((client, id) => <ClientContainer key={id} style={{ width: "45%" }} >

                        <VideoElement ref={(instance) => provideRef(instance, client?.id)} autoPlay isVideoOn={client?.isVideoOn} />
                        {!client?.isVideoOn && (
                            <AvtarContainer>
                                {client?.avatar ?
                                    <img
                                        src={client.avatar}
                                        alt={`${client.fullName}'s avatar`}
                                    /> : <DummyImage><span>{client?.userName?.charAt(0).toUpperCase()}</span></DummyImage>}
                            </AvtarContainer>
                        )}
                        <p>{client?.fullName}</p>
                    </ClientContainer >)
                }
            </VideoContainer >

            <Controls>
                <div>
                    <button onClick={() => {
                        setIsAudioOn(prev => !prev)
                        handleAudio()
                    }}><span>{isAudioOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}</span></button>
                    <button onClick={() => {
                        setIsVideoOn(prev => !prev)
                        handleVideo(user?.id)
                    }}><span>{isVideoOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}</span></button>
                    {screenIsSharing ? <button onClick={() => {
                        stopScreenSharing(setscreenIsSharing)
                    }}><span><MdOutlineStopScreenShare size={20} /></span></button> : <button onClick={() => {
                        startScreenSharing(setscreenIsSharing)

                    }}><span><MdOutlineScreenShare size={20} /></span></button>}
                    <button onClick={() => {
                        leaveRoom()
                        navigate("/rooms")
                    }}><span><MdCallEnd size={20} color='red' /></span></button>
                </div>
            </Controls >
        </RoomConatiner>
    )
}

export default Room

const RoomConatiner = styled.div`
    
`
const VideoContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
align-items: center;
gap: 10%;
width: 100%;
height: 100%;
`

const Controls = styled.div`
position: fixed;
bottom: 30px;
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
&>div{
    width: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    border-radius: 22px;

    &>button{
        cursor: pointer;
            background: #1d1d1d;
            padding: 20px;
            border-radius: 50%;
            border: none;
            outline: none;
    }
}
`

const ClientContainer = styled.div`
    width: 450px;
    height: 450px;
    position: relative;
    text-align: center;
`
const VideoElement = styled.video.withConfig({
    shouldForwardProp: (prop) => prop !== "isVideoOn",
})`
    width: 100%;
    height: 100%; 
    display: ${(props) => (props.isVideoOn ? "block" : "none")};
    margin: 0 auto; 
    object-fit: fill;
`
const AvtarContainer = styled.div`
    width: 100%;
    height: 100%; 
    display:flex ;
    justify-content: center;
    align-items: center;
    background: #1d1d1d;
    
`