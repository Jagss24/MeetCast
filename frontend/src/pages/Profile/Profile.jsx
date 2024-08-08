import React, { useEffect, useState } from 'react'
import { ProfileWrapperStyled, ProfileContainer, RoomContainer, ImageContainer, UserInfoContainer, RoomTypes, RoomTypeHeading, NoRoomContainer, CoverContainer, AboutAndRoomContainer, SessionBox } from './Profile.styled'
import { getUserRoom, getSpeakers } from '../../api/api'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { RoomCardContainer } from '../Rooms/Rooms.styled'
import RoomCard from '../../components/RoomCard/RoomCard'
import DummyImage from '../../components/DummyImage'
import { IoChevronBackSharp, IoCameraOutline, IoTimer } from "react-icons/io5";

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
            <CoverContainer >
                <img src="/images/bgm.jpg" alt="cover_img" />
                <span onClick={() => navigate("/rooms")} className='goBack'>
                    <IoChevronBackSharp size={20} />
                </span>
                <label className='camera' htmlFor='cover_picker'>
                    <IoCameraOutline size={20} />
                </label>
                <input type='file' id="cover_picker" />
            </CoverContainer>
            <ProfileContainer>
                <ImageContainer>
                    {avatar ? <img src={avatar} alt="user-pic" /> : <DummyImage userName={"A"} width={150} height={150} />}
                </ImageContainer>
                <UserInfoContainer>
                    <h3>Jagannath Samantra</h3>
                    <p>@jagss</p>
                </UserInfoContainer>
            </ProfileContainer>
            <AboutAndRoomContainer>
                <div className='aboutContainer'>
                    <h4>About Me</h4>
                    <p>Hi, I’m Jagannath! I'm a music enthusiast, tech geek, avid gamer. Here to connect, share, and enjoy meaningful conversations.</p>
                    <div className='sessions'>
                        <SessionBox>
                            <span>
                                <IoTimer size={"100%"} />
                            </span>
                            <div>
                                <p>Sessions Completed</p>
                                <span>10</span>
                            </div>

                        </SessionBox>
                    </div>
                </div>

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
                    <RoomCardContainer isProfile={true}>
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
            </AboutAndRoomContainer>
        </ProfileWrapperStyled >
    )
}

export default Profile