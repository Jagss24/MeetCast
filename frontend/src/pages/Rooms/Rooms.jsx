import React, { useEffect, useState } from 'react'
import { RoomComponent, RoomCardContainer, SearchInput, RoomNav, FirstChild, SecondChild, StartContainer, LoadingDiv } from './Rooms.styled'
import { MdOutlinePeople } from "react-icons/md";
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
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span>All Voice rooms</span>
                            <span style={{ border: "1px solid red", marginTop: "8px", width: "50px" }}></span>
                        </div>
                        <SearchInput type='text' placeholder='Type here / to search' />
                    </FirstChild>
                    <SecondChild onClick={() => setShowModal(true)}>
                        <MdOutlinePeople color='#fff' size={18} />
                        <StartContainer>Start a room</StartContainer>
                    </SecondChild>
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