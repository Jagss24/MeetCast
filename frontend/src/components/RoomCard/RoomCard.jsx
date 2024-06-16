import React from 'react'
import { RoomCardStyled, RoomMain, Topic, SpeakerContainers, SpeakersAvatar, SpeakersName, TotalNumber, IconContainer, JoinRoom } from './RoomCard.styled'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

const RoomCard = ({ topic, speakers, totalMembers }) => {
    const borderColors = ["red", "green", "blue", "yellow"];
    return (
        <RoomCardStyled>
            <RoomMain>
                <Topic>{topic}</Topic>
                <SpeakerContainers>
                    <SpeakersAvatar randomcolors={borderColors[Math.floor(Math.random() * 4)]}>
                        {speakers.map((speaker, index) => <img key={index} src={speaker?.avatar} alt={"profile"}
                        />)}
                    </SpeakersAvatar>
                    <SpeakersName>
                        {speakers.map((speaker, index) => <span key={index} >{speaker?.name} <IoChatbubbleEllipsesOutline /></span>)}
                    </SpeakersName>
                </SpeakerContainers>
                <TotalNumber>
                    <span>{totalMembers}</span>
                    <IconContainer>
                        <FaUserAlt color={"#C4C5C5"} />
                    </IconContainer>
                </TotalNumber>
                <JoinRoom>
                    <span>Join the Room  </span>
                </JoinRoom>
            </RoomMain>
        </RoomCardStyled>
    )
}

export default RoomCard