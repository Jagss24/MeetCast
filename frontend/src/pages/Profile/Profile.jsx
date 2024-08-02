import React, { useEffect, useState } from 'react'
import { ProfileWrapperStyled, ProfileContainer, RoomContainer, ImageContainer, UserInfoContainer, RoomTypes, RoomTypeHeading, NoRoomContainer, GoBack } from './Profile.styled'
import { getUserRoom, getSpeakers } from '../../api/api'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { RoomCardContainer } from '../Rooms/Rooms.styled'
import RoomCard from '../../components/RoomCard/RoomCard'
import DummyImage from '../../components/DummyImage'

const Profile = ({ avatar }) => {
    const roomTypes = ["podcast", "meet", "speakingRooms"]
    const { userName } = useParams()
    const navigate = useNavigate()
    const [activeRoomtype, setActiveRoomtype] = useState(roomTypes[0])
    const [rooms, setRooms] = useState([])
    const { data, isFetching, refetch } = useQuery({
        queryKey: [`get-${activeRoomtype}`],
        queryFn: () => getUserRoom(activeRoomtype, userName),
        refetchOnWindowFocus: false,
        enabled: false
    })

    const { data: speakersRoomData, isFetching: speakrsFetching, refetch: speakersRefetch } = useQuery({
        queryKey: ["get-user-speakersRoom"],
        queryFn: () => getSpeakers(userName),
        enabled: false
    })
    useEffect(() => {
        if (data?.data) {
            setRooms(data?.data?.rooms)
        }
    }, [data])

    useEffect(() => {
        if (activeRoomtype !== "speakingRooms")
            refetch()
    }, [activeRoomtype])

    useEffect(() => {
        if (speakersRoomData?.data) {
            setRooms(speakersRoomData?.data?.rooms)
        }
    }, [speakersRoomData])
    return (
        <ProfileWrapperStyled>
            <GoBack>
                <button onClick={()=> navigate("/rooms")}>Go Back</button>
            </GoBack>
            <ProfileContainer>
                <ImageContainer>
                    {avatar ? <img src={avatar} alt="user-pic" /> : <DummyImage userName={"A"} width={90} height={90} />}
                </ImageContainer>
                <UserInfoContainer>
                    <h3>Jagannath Samantra</h3>
                    <p>@jagss</p>
                </UserInfoContainer>
            </ProfileContainer>
            <RoomContainer>
                <RoomTypes>
                    <RoomTypeHeading active={activeRoomtype === roomTypes[0]}
                        onClick={() => setActiveRoomtype(roomTypes[0])}>My podcasts</RoomTypeHeading>
                    <RoomTypeHeading active={activeRoomtype === roomTypes[1]}
                        onClick={() => setActiveRoomtype(roomTypes[1])}>My meets</RoomTypeHeading>
                    <RoomTypeHeading active={activeRoomtype === roomTypes[2]}
                        onClick={() => {
                            setActiveRoomtype(roomTypes[2])
                            speakersRefetch()
                        }}>My Speaking Rooms</RoomTypeHeading>
                </RoomTypes>
                <RoomCardContainer>
                    {
                        isFetching || speakrsFetching ? <NoRoomContainer>Loading...</NoRoomContainer> :
                            rooms.length ? rooms.map((room, index) => <RoomCard key={index} room={room}></RoomCard>) :
                                <NoRoomContainer>
                                    <div>
                                        <p>No rooms available</p>
                                        {activeRoomtype === "speakingRooms" && <p className='no-rooms'>In this only that rooms will be shown in which you are only a speaker and not the host of the room</p>}

                                    </div>
                                </NoRoomContainer>
                    }
                </RoomCardContainer>
            </RoomContainer>
        </ProfileWrapperStyled >
    )
}

export default Profile