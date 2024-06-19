import React, { useState } from 'react'
import { StartRoomContainer, StartRoomBody, StartRoomHeader, StartRoomFooter, RoomTypes, RoomType, RoomTitle } from './StartRoom.styled'
import { SearchInput } from '../../pages/Rooms/Rooms.styled';
import { HiXMark } from "react-icons/hi2";

const StartRoom = ({ closeModal }) => {
    const roomType = ["open", "social", "private"]
    const [activeRoom, setActiveRoom] = useState(roomType[0])
    console.log(activeRoom)
    return (
        <StartRoomContainer>
            <StartRoomBody>
                <StartRoomHeader>
                    <h3>Enter the topic to be discussed</h3>
                    <SearchInput fullWidth={true} />
                    <span>Room types</span>
                    <RoomTypes>
                        <div>
                            <RoomType roomType={activeRoom === "open"} onClick={() => setActiveRoom(roomType[0])}>
                                <img src="/images/Globe.png" />
                                <RoomTitle>Open</RoomTitle>
                            </RoomType>
                        </div>
                        <div>
                            <RoomType roomType={activeRoom === "social"} onClick={() => setActiveRoom(roomType[1])}>
                                <img src="/images/Users.png" />
                                <RoomTitle>Social</RoomTitle>
                            </RoomType>
                        </div>
                        <div>
                            <RoomType roomType={activeRoom === "private"} onClick={() => setActiveRoom(roomType[2])}>
                                <img src="/images/lock.png" style={{ width: "30px" }} />
                                <RoomTitle>Private</RoomTitle>
                            </RoomType>
                        </div>
                    </RoomTypes>
                </StartRoomHeader>
                <StartRoomFooter>
                    <span>Start a room, open to everyone</span>
                    <button>
                        <img src="/images/Emoji.png" />
                        <span>Let's go</span></button>
                </StartRoomFooter>
                <span onClick={closeModal}>
                    <HiXMark color={"#fff"} size={20} />
                </span>
            </StartRoomBody>
        </StartRoomContainer >
    )
}

export default StartRoom