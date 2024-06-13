import React from 'react'
import { RoomComponent, RoomMainComponent, SearchInput, RoomNav, FirstChild, SecondChild, StartContainer } from './Rooms.styled'
import { MdOutlinePeople } from "react-icons/md";

const Rooms = () => {
    return (
        <RoomComponent>
            <RoomNav>
                <FirstChild>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>All Voice rooms</span>
                        <span style={{ border: "1px solid red", marginTop: "8px", width: "50px" }}></span>
                    </div>
                    <SearchInput type='text' placeholder='Type here / to search' />
                </FirstChild>
                <SecondChild>
                    <MdOutlinePeople color='#fff' size={18} />
                    <StartContainer>Start a room</StartContainer>
                </SecondChild>
            </RoomNav>
        </RoomComponent>
    )
}

export default Rooms