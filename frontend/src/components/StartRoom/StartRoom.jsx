import React, { memo, useEffect, useState } from 'react'
import { StartRoomContainer, StartRoomBody, StartRoomHeader, StartRoomFooter, RoomTypes, RoomType, RoomTitle } from './StartRoom.styled'
import { SearchInput } from '../../pages/Rooms/Rooms.styled';
import { HiXMark } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query"
import { createRoom } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const StartRoom = ({ closeModal }) => {
    const navigate = useNavigate()
    const roomType = ["open", "social", "private"]
    const [activeRoom, setActiveRoom] = useState(roomType[0])
    const [topic, setTopic] = useState("")

    const handleCreateRoom = () => {
        if (topic.split(" ").length < 2) {
            return alert("Topic should be atleast of 2 words")
        }
        mutate({
            topic: topic,
            roomType: activeRoom,
        })
    }

    const { data, mutate } = useMutation({
        mutationFn: createRoom
    })

    useEffect(() => {
        if (data?.data) {
            const roomId = data?.data?.roomDtos?.id
            navigate(`/room/${roomId}`)
        }
    }, [data])
    return (
        <StartRoomContainer>
            <StartRoomBody>
                <StartRoomHeader>
                    <h3>Enter the topic to be discussed</h3>
                    <SearchInput fullWidth={true} value={topic} onChange={(e) => setTopic(e.target.value)} />
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
                    <button onClick={handleCreateRoom}>
                        <img src="/images/Emoji.png" />
                        <span >Let's go</span></button>
                </StartRoomFooter>
                <select>
                    <option>PodCast</option>
                    <option>Meet</option>
                </select>
                <span onClick={closeModal}>
                    <HiXMark color={"#fff"} size={20} />
                </span>
            </StartRoomBody>
        </StartRoomContainer >
    )
}

export default memo(StartRoom)