import React, { useState } from 'react'
import { usePodCast } from '../../hooks/usePodCast';
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import DummyImage from '../DummyImage';
import { AudioConatiner, AudioElement } from './Podcast.styled';
import { Controls, AvtarContainer } from '../Meet/Meet.styled';
const Podcast = ({ roomId, user, isSpeaker, isOwner }) => {
    const navigate = useNavigate()
    const { clients, provideRef, leaveRoom, handleAudio, clientIds, isUserSpeaking } = usePodCast({ roomId, user, isSpeaker, isOwner })
    const [isAudioOn, setIsAudioOn] = useState(false)
    console.log({ clients })
    console.log({ clientIds })
    console.log({ isUserSpeaking })
    console.log({ isSpeaker, isOwner })
    return (
        <>
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
                                    /> : <DummyImage userName={client?.fullName?.charAt(0).toUpperCase()} />}
                            </AvtarContainer>
                            <p>{client?.fullName}</p>
                            {client?.isOwner ? <p>(Owner)</p> : client?.isSpeaker ? <p>(Speaker)</p> : <></>}
                        </AudioElement>)
                }
            </AudioConatiner>

            <Controls>
                <div>
                    {(isSpeaker || isOwner) && <button onClick={() => {
                        setIsAudioOn(prev => !prev)
                        handleAudio(user?.id)
                    }}><span>{isAudioOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}</span></button>}
                    <button onClick={() => {
                        leaveRoom()
                        navigate("/rooms")
                    }}><span><MdCallEnd size={20} color='red' /></span></button>
                </div>
            </Controls >
        </>
    )
}

export default Podcast
