import React, { useState } from 'react'
import { RoomComponent, RoomCardContainer, SearchInput, RoomNav, FirstChild, SecondChild, StartContainer } from './Rooms.styled'
import { MdOutlinePeople } from "react-icons/md";
import RoomCard from '../../components/RoomCard/RoomCard';
import { rooms } from './room';
import StartRoom from '../../components/StartRoom/StartRoom';

const Rooms = () => {
    const [showModal, setShowModal] = useState(false)
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
                <RoomCardContainer>
                    {
                        rooms.map((room, index) => <RoomCard key={index} topic={room?.topic} speakers={room?.speakers} totalMembers={room?.totalMembers}></RoomCard>)
                    }
                    {/* <RoomCard />
                <RoomCard />
                <RoomCard /> */}
                </RoomCardContainer>
            </RoomComponent>
            {showModal && <StartRoom />}
        </>
    )
}

export default Rooms