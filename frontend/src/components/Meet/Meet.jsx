import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useWebRTC } from '../../hooks/useWebRtc'
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaUsers } from "react-icons/fa";
import { MdOutlineScreenShare, MdCallEnd, MdOutlineStopScreenShare, MdOutlineMessage, MdSend } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import DummyImage from '../DummyImage';
import { MeetContainer, VideoContainer, VideoElement, ClientContainer, AvtarContainer, Controls, TopicStyle, VideoAndChatContainer, ChatContainer, ChatInputContainer, ChatInnerContainer, OptionsContainer, EachOption, PariticiPantContainer, PariticiPantInnerContainer, ClientNameContainer, ChatMessageContainer } from './Meet.styled';
import { setIsNavbarVisible } from '../../slices/utilitySlice';

const Meet = ({ roomId, user, roomTopic }) => {
    const navigate = useNavigate()
    const { clients, provideRef, screenSharing, handleVideo, leaveRoom, handleAudio, clientIds, isUserSpeaking, sendMessage, clientMessages } = useWebRTC({ roomId, user })
    const { startScreenSharing, stopScreenSharing } = screenSharing()
    const [isAudioOn, setIsAudioOn] = useState(false)
    const [isVideoOn, setIsVideoOn] = useState(false)
    const [msgContent, setMsgContent] = useState("")
    const [screenIsSharing, setscreenIsSharing] = useState(false)
    const [chat, setChat] = useState(false)
    const [showParticipants, setShowParticipants] = useState(false)
    const dispatch = useDispatch()
    console.log({ clients })
    console.log({ clientIds })
    console.log({ isUserSpeaking })
    console.log({ clientMessages })
    const openChatorParitciPant = (toOpen) => {
        if (toOpen === "chat") {
            if (!chat && !showParticipants) {
                setChat(true)
            }
            else if (!chat && showParticipants) {
                setShowParticipants(false)
                setChat(true)
            }
            else {
                setChat(false)
            }
        }
        else {
            if (!showParticipants && !chat) {
                setShowParticipants(true)
            }
            else if (!showParticipants && chat) {
                setChat(false)
                setShowParticipants(true)
            }
            else {
                setShowParticipants(false)
            }
        }
    }

    return (
        <MeetContainer>
            <TopicStyle>
                <span>
                    <IoShieldCheckmarkOutline color="20bd5f" size={"50%"} />
                </span>
                <h4>website redesign project kickoff</h4>
            </TopicStyle>
            <VideoAndChatContainer fullScreen={chat || showParticipants}>
                <OptionsContainer>
                    <EachOption onClick={() => openChatorParitciPant("chat")}>
                        <MdOutlineMessage size={"70%"} color={chat ? "#20bd5f" : "#fff"} />
                    </EachOption>
                    <EachOption onClick={() => openChatorParitciPant("showParticipants")}>
                        <FaUsers size={"70%"} color={showParticipants ? "#20bd5f" : "#fff"} />
                    </EachOption>
                </OptionsContainer>
                <VideoContainer>
                    {
                        clients.map((client, id) => <ClientContainer key={id}>

                            <VideoElement ref={(instance) => provideRef(instance, client?.id)} autoPlay isVideoOn={client?.isVideoOn} />
                            {!client?.isVideoOn && (
                                <AvtarContainer isUserSpeaking={client?.isAudioOn}>
                                    {client?.avatar ?
                                        <img
                                            src={client.avatar}
                                            alt={`${client.fullName}'s avatar`}
                                        /> : <DummyImage userName={client?.fullName?.charAt(0).toUpperCase()} width={90} height={90} />}
                                </AvtarContainer>
                            )}
                            <p>{client?.fullName}</p>
                        </ClientContainer >)
                    }
                </VideoContainer>
                {chat && <ChatContainer >
                    <ChatInnerContainer>
                        <h3>Chat With other users</h3>
                        <div className={"infoContainer"}>
                            <p>Messages sent here are visible to everyone in the meeting. Please use proper language and be respectful in your communication. </p>
                        </div>
                        <ChatMessageContainer>
                            {clientMessages?.map(eachClientMsg => <div>
                                <h5>{eachClientMsg?.userFullName}</h5>
                                <p>{eachClientMsg?.msgContent}</p>
                            </div>)}
                            {/* <div>
                                <h5>Jagannath Samantra</h5>
                                <p>Hii everyone</p>
                            </div>
                            <div>
                                <h5>Satyaa Samantra</h5>
                                <p>Hii</p>
                            </div> */}
                        </ChatMessageContainer>
                        <ChatInputContainer>
                            <input value={msgContent} onChange={(e) => setMsgContent(e.target.value)} placeholder='Send a message to everyone' />
                            <span onClick={() => sendMessage({ userId: user?.id, userFullName: user?.fullName, msgContent, userAvatar: user?.avatar })}>
                                <MdSend size={"70"} />
                            </span>
                        </ChatInputContainer>

                    </ChatInnerContainer>
                </ChatContainer>}
                {showParticipants && <PariticiPantContainer>
                    <PariticiPantInnerContainer>
                        <h3>ParticiPants</h3>
                        <h5>In meet</h5>
                        <ClientNameContainer>
                            {clients?.map(client => <div>
                                {client?.avatar ? <img src={client?.avatar} alt="user_pic" /> : <DummyImage userName={client?.fullName?.charAt(0).toUpperCase()} width={30} height={30} />}
                                <p>{client?.fullName}</p>
                            </div>)}
                        </ClientNameContainer>
                    </PariticiPantInnerContainer>
                </PariticiPantContainer>}
            </VideoAndChatContainer>
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
                        dispatch(setIsNavbarVisible(true))
                        navigate("/rooms")
                    }}><span><MdCallEnd size={20} color='red' /></span></button>
                </div>
            </Controls>
        </MeetContainer>
    )
}

export default Meet