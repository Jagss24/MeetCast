import React from 'react'
import { RoomCardStyled, RoomMain, Topic, SpeakerContainers, SpeakersAvatar, SpeakersName, TotalNumber, IconContainer } from './RoomCard.styled'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

const RoomCard = () => {
    return (
        <RoomCardStyled>
            <RoomMain>
                <Topic>Which framework is best for you? Lets us discuss!!</Topic>
                <SpeakerContainers>
                    <SpeakersAvatar>
                        <img src='/images/monkey.png' />
                        <img src='/images/monkey.png' />
                    </SpeakersAvatar>
                    <SpeakersName>
                        <span>Om Rai <IoChatbubbleEllipsesOutline /></span>
                        <span>Jagannath Samantara <IoChatbubbleEllipsesOutline /></span>
                    </SpeakersName>
                </SpeakerContainers>
                <TotalNumber>
                    <span>800</span>
                    <IconContainer>
                        <FaUserAlt color={"#C4C5C5"} />
                    </IconContainer>


                </TotalNumber>
            </RoomMain>
        </RoomCardStyled>
    )
}

export default RoomCard