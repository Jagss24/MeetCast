import React, { useEffect, useState } from 'react'
import { RoomComponent, RoomCardContainer, RoomNav, FirstChild, Buttons, LoadingDiv } from './Rooms.styled'
import { MdOutlineKeyboardArrowDown, MdVoiceChat } from "react-icons/md";
import RoomCard from '../../components/RoomCard/RoomCard';
import StartRoom from '../../components/StartRoom/StartRoom';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../../api/api';
import { Grid } from "react-loading-icons"
const Rooms = () => {
    const [showModal, setShowModal] = useState(false)
    const [rooms, setRooms] = useState([])

    const { data, isLoading } = useQuery({
        queryKey: ["get-rooms"],
        queryFn: getRooms,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data?.data) {
            setRooms(data?.data?.rooms)
        }
    }, [data])
    return (
        <>
            <RoomComponent>
                <RoomNav>
                    <FirstChild>
                        <Buttons active={true}>
                            <span >All Voice rooms</span>
                        </Buttons>
                        <Buttons>
                            <span>Recents</span>
                        </Buttons>
                        <Buttons>
                            <span>Topics</span>
                            <span>
                                <MdOutlineKeyboardArrowDown color='#fff' size={20} />
                            </span>
                        </Buttons>
                    </FirstChild>
                    <Buttons onClick={() => setShowModal(true)} active={true}>
                        <MdVoiceChat color='rgb(32, 189, 95)' size={18} />
                        <span>Start a room</span>
                    </Buttons>
                </RoomNav>
                {isLoading ?
                    <LoadingDiv >
                        <Grid speed={3} />
                        <span> Please wait rooms are loading...</span>
                    </LoadingDiv> : <RoomCardContainer>
                        {
                            rooms.map((room, index) => <RoomCard key={index} room={room}></RoomCard>)
                        }
                    </RoomCardContainer>
                }
            </RoomComponent>
            {showModal && <StartRoom closeModal={() => setShowModal(false)} />}
        </>
    )
}

export default Rooms