import React from 'react'
import { useWebRTC } from '../../hooks/useWebRtc'
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

const Room = () => {
    const { id: roomId } = useParams()
    const { user } = useSelector(state => state.user)
    const { clients, provideRef } = useWebRTC(roomId, user)
    console.log({ clients })
    return (
        <>
            <div>Room</div>
            {
                clients.map((client, id) => client?.id && <div key={id}>
                    <video ref={(instance) => provideRef(instance, client?.id)} controls autoPlay />
                    <p>{client?.fullName}</p>
                </div>)
            }
        </>
    )
}

export default Room