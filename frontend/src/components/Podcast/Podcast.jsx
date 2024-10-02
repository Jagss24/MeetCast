import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { usePodCast } from '../../hooks/usePodCast';
import { FaMicrophone, FaMicrophoneSlash, FaUsers } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdCallEnd, MdOutlineMessage, MdSend } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import DummyImage from '../DummyImage';
import { AudioConatiner, AudioElement, PodContainer, AudioAndChatContainer } from './Podcast.styled';
import { Controls, AvtarContainer, TopicStyle, ChatContainer, OptionsContainer, EachOption, ChatInnerContainer, ChatInputContainer, ChatMessageContainer, PariticiPantContainer, PariticiPantInnerContainer, ClientNameContainer, MobileChatAndPariticipantContainer, UserToast } from '../Meet/Meet.styled';
import { setIsNavbarVisible } from '../../slices/utilitySlice';
import toast from 'react-hot-toast';
const Podcast = ({ roomId, roomTopic, user, isSpeaker, isOwner }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //state's
    const [isAudioOn, setIsAudioOn] = useState(false)
    const [chat, setChat] = useState(false)
    const [showParticipants, setShowParticipants] = useState(false)
    const [msgContent, setMsgContent] = useState("")


    //function's
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
    const showToastFunc = ({ remoteUser }) => {
        toast.custom(() => <UserToast>
            <div>
                {remoteUser?.avatar
                    ? <img src={remoteUser?.avatar} alt="user_pic" referrerPolicy='no-referrer' />
                    : <DummyImage width={40} height={40}
                        userName={remoteUser?.fullName?.charAt(0)} fontSize={1.1} />}
            </div>
            <div className='userName'>
                <span>{remoteUser?.fullName} joined the room</span>
            </div>
        </UserToast>, { position: "bottom-right" })
    }

    //Hook
    const { clients, provideRef, leaveRoom, handleAudio, sendMessage, clientMessages } = usePodCast({ roomId, user, isSpeaker, isOwner, showToastFunc })
    return (
        <PodContainer>
            <TopicStyle>
                <div className='icon'>
                    <span>
                        <IoShieldCheckmarkOutline color="20bd5f" size={"50%"} />
                    </span>
                </div>
                <h4>{roomTopic}</h4>
            </TopicStyle>
            <AudioAndChatContainer fullScreen={chat || showParticipants}>
                <OptionsContainer>
                    <EachOption onClick={() => openChatorParitciPant("chat")}>
                        <MdOutlineMessage size={"70%"} style={{ color: chat ? "#B0B0B0" : "var(--button-color)" }} />
                    </EachOption>
                    <EachOption onClick={() => openChatorParitciPant("showParticipants")}>
                        <FaUsers size={"70%"} style={{ color: showParticipants ? "#B0B0B0" : "var(--button-color)" }} />
                    </EachOption>
                </OptionsContainer>
                <AudioConatiner>
                    {
                        clients.map((client, id) =>
                            <AudioElement key={id} >
                                <audio ref={(instance) => provideRef(instance, client?.id)} autoPlay />
                                <AvtarContainer audioElem={true} isUserSpeaking={client?.isAudioOn}>
                                    {client?.avatar ?
                                        <img
                                            src={client.avatar}
                                            alt={`${client.fullName}'s avatar`}
                                            referrerPolicy='no-referrer'
                                        /> : <DummyImage userName={client?.fullName?.charAt(0).toUpperCase()} />}
                                </AvtarContainer>
                                <p>{client?.fullName}</p>
                                {client?.isOwner ? <p>(Owner)</p> : client?.isSpeaker ? <p>(Speaker)</p> : <></>}
                            </AudioElement>)
                    }
                </AudioConatiner>
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
                        </ChatMessageContainer>
                        <ChatInputContainer>
                            <input value={msgContent} onChange={(e) => setMsgContent(e.target.value)} placeholder='Send a message to everyone' />
                            <span onClick={() => {
                                sendMessage({ userId: user?.id, userFullName: user?.fullName, msgContent, userAvatar: user?.avatar })
                                setMsgContent("")
                            }}>
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
                                {client?.avatar ? <img src={client?.avatar} alt="user_pic" referrerPolicy='no-referrer' /> : <DummyImage userName={client?.fullName?.charAt(0).toUpperCase()} width={30} height={30} />}
                                <p>{client?.fullName}</p>
                            </div>)}
                        </ClientNameContainer>
                    </PariticiPantInnerContainer>
                </PariticiPantContainer>}

            </AudioAndChatContainer>
            <MobileChatAndPariticipantContainer fullScreen={chat || showParticipants}>
                {chat &&
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
                        </ChatMessageContainer>
                        <ChatInputContainer>
                            <input value={msgContent} onChange={(e) => setMsgContent(e.target.value)} placeholder='Send a message to everyone' />
                            <span onClick={() => {
                                sendMessage({ userId: user?.id, userFullName: user?.fullName, msgContent, userAvatar: user?.avatar })
                                setMsgContent("")
                            }}>
                                <MdSend size={"70"} />
                            </span>
                        </ChatInputContainer>

                    </ChatInnerContainer>
                }
                {showParticipants &&
                    <PariticiPantInnerContainer>
                        <h3>ParticiPants</h3>
                        <h5>In meet</h5>
                        <ClientNameContainer>
                            {clients?.map(client => <div>
                                {client?.avatar ? <img src={client?.avatar} alt="user_pic" referrerPolicy='no-referrer' /> : <DummyImage userName={client?.fullName?.charAt(0).toUpperCase()} width={30} height={30} />}
                                <p>{client?.fullName}</p>
                            </div>)}
                        </ClientNameContainer>
                    </PariticiPantInnerContainer>
                }
            </MobileChatAndPariticipantContainer>
            <Controls>
                <div>
                    {(isSpeaker || isOwner) && <button onClick={() => {
                        setIsAudioOn(prev => !prev)
                        handleAudio(user?.id)
                    }}><span>{isAudioOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}</span></button>}
                    <button onClick={() => {
                        leaveRoom()
                        dispatch(setIsNavbarVisible(true))
                        navigate("/rooms")
                    }}><span><MdCallEnd size={20} color='red' /></span></button>
                </div>
            </Controls >
        </PodContainer>
    )
}

export default Podcast
