import React, { useState } from 'react'
import { useWebRTC } from '../../hooks/useWebRtc'
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdOutlineScreenShare, MdCallEnd, MdOutlineStopScreenShare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import DummyImage from '../DummyImage';
import { VideoContainer, VideoElement, ClientContainer, AvtarContainer, Controls } from './Meet.styled';

const Meet = ({ roomId, user }) => {
    const navigate = useNavigate()
    const { clients, provideRef, screenSharing, handleVideo, leaveRoom, handleAudio, clientIds, isUserSpeaking } = useWebRTC({ roomId, user })
    const { startScreenSharing, stopScreenSharing } = screenSharing()
    const [isAudioOn, setIsAudioOn] = useState(false)
    const [isVideoOn, setIsVideoOn] = useState(false)
    const [screenIsSharing, setscreenIsSharing] = useState(false)
    console.log({ clients })
    console.log({ clientIds })
    console.log({ isUserSpeaking })
    return (
        <>
            <VideoContainer>
                {
                    clients.map((client, id) => <ClientContainer key={id} style={{ width: "45%" }} >

                        <VideoElement ref={(instance) => provideRef(instance, client?.id)} autoPlay isVideoOn={client?.isVideoOn} />
                        {!client?.isVideoOn && (
                            <AvtarContainer isUserSpeaking={client?.isAudioOn}>
                                {client?.avatar ?
                                    <img
                                        src={client.avatar}
                                        alt={`${client.fullName}'s avatar`}
                                    /> : <DummyImage userName={client?.userName?.charAt(0).toUpperCase()} width={90} height={90} />}
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
                        handleAudio(user?.id)
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
        </>
    )
}

export default Meet
