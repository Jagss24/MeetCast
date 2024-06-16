import React from 'react'
import { StartRoomContainer, StartRoomBody, StartRoomHeader, StartRoomFooter } from './StartRoom.styled'
import { SearchInput } from '../../pages/Rooms/Rooms.styled'

const StartRoom = () => {
    return (
        <StartRoomContainer>
            <StartRoomBody>
                <StartRoomHeader>
                    <h3>Enter the topic to be discussed</h3>
                    <SearchInput fullWidth={true} />
                </StartRoomHeader>
                <StartRoomFooter>hf</StartRoomFooter>
            </StartRoomBody>
        </StartRoomContainer>
    )
}

export default StartRoom