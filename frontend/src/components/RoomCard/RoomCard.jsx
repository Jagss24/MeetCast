import React from 'react'
import { RoomCardStyled, RoomMain, Topic, SpeakerContainers, SpeakersAvatar, SpeakersName, TotalNumber, IconContainer, JoinRoom } from './RoomCard.styled'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { DummyImage } from '../shared/Navigation/Navigation';

const RoomCard = ({ room }) => {
    const borderColors = ["red", "green", "blue", "yellow"];
    const navigate = useNavigate()
    return (
        <RoomCardStyled>
            <RoomMain>
                <Topic>{room?.topic}</Topic>
                <SpeakerContainers>
                    <SpeakersAvatar randomcolors={borderColors[Math.floor(Math.random() * 4)]} speakerLength={room?.speakers.length}>
                        {room?.speakers.map((speaker, index) => speaker?.avatar ? <img key={index} src={speaker?.avatar} alt={"profile"}
                        /> : <DummyImage key={index}><span>{speaker?.userName?.charAt(0).toUpperCase()}</span></DummyImage>)}
                    </SpeakersAvatar>
                    <SpeakersName>
                        {room?.speakers.map((speaker, index) => <span key={index} >{speaker?.fullName} <IoChatbubbleEllipsesOutline /></span>)}
                    </SpeakersName>
                </SpeakerContainers>
                <TotalNumber>
                    <span>{room?.totalMembers}</span>
                    <IconContainer>
                        <FaUserAlt color={"#C4C5C5"} />
                    </IconContainer>
                </TotalNumber>
                <JoinRoom onClick={() => navigate(`/room/${room?._id}`)}>
                    <span>Join the Room  </span>
                </JoinRoom>
            </RoomMain>
        </RoomCardStyled>
    )
}

export default RoomCard