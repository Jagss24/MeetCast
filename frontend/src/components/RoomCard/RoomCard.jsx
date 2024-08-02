import React from 'react'
import { RoomCardStyled, RoomMain, Topic, SpeakerContainers, SpeakersAvatar, SpeakersName, JoinRoom } from './RoomCard.styled'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import DummyImage from '../DummyImage';

const RoomCard = ({ room }) => {
    const borderColors = ["red", "green", "blue", "yellow"];
    const navigate = useNavigate()
    return (
        <RoomCardStyled>
            <RoomMain>
                <Topic>{room?.topic}</Topic>
                <SpeakerContainers>
                    <SpeakersAvatar randomcolors={borderColors[Math.floor(Math.random() * 4)]} speakerLength={room?.speakers.length}>
                        {room?.speakers?.length <= 2 ?
                            room?.speakers.map((speaker, index) => speaker?.avatar
                                ? <img key={index} src={speaker?.avatar} alt={"profile"} />
                                : <DummyImage key={index} userName={speaker?.fullName?.charAt(0).toUpperCase()} />) :
                            room?.speakers.slice(0, 2).map((speaker, index) =>
                                speaker?.avatar
                                    ? <img key={index} src={speaker?.avatar} alt={"profile"} />
                                    : <DummyImage key={index} userName={speaker?.fullName?.charAt(0).toUpperCase()} />)}
                    </SpeakersAvatar>
                    <SpeakersName>
                        {room?.speakers?.length <= 2 ?
                            room?.speakers.map((speaker, index) => <span key={index} >{speaker?.fullName} <IoChatbubbleEllipsesOutline /></span>) :
                            room?.speakers.slice(0, 2).map((speaker, index) => <span key={index} >{speaker?.fullName} <IoChatbubbleEllipsesOutline /></span>)
                        }
                    </SpeakersName>
                </SpeakerContainers>
                <JoinRoom onClick={() => navigate(`/room/${room?._id}`)}>
                    <span>Join the Room  </span>
                </JoinRoom>
            </RoomMain>
        </RoomCardStyled>
    )
}

export default RoomCard