import React from 'react'
import { useWebRtc } from '../../hooks/useWebRtc'
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

const Room = () => {
    const { id: roomId } = useParams()
    const { user } = useSelector(state => state.user)
    const { clients, provideRef } = useWebRtc(roomId, user)
    return (
        <>
            <div>Room</div>
            {
                clients.map((client, id) => <div key={id}>
                    <audio ref={(instance) => provideRef(instance, client.id)} controls />
                    <p>{client.name}</p>
                </div>)
            }
        </>
    )
}

export default Room