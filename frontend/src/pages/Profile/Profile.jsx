import React, { useEffect, useState } from 'react'
import { ProfileWrapperStyled, ProfileContainer, RoomContainer, ImageContainer, UserInfoContainer, RoomTypes, RoomTypeHeading, NoRoomContainer, CoverContainer, AboutAndRoomContainer, SessionBox, AboutModalStyled } from './Profile.styled'
import { getUserRoom, getSpeakers, getUserbyUserName, photoUpdation } from '../../api/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { RoomCardContainer } from '../Rooms/Rooms.styled'
import RoomCard from '../../components/RoomCard/RoomCard'
import DummyImage from '../../components/DummyImage'
import { IoChevronBackSharp, IoCameraOutline, IoTimer } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { LoadingContainer } from '../Room/Room.styled'
import { ThreeDots } from 'react-loading-icons'
import toast from 'react-hot-toast'

const Profile = ({ user }) => {
    const roomTypes = ["podcast", "meet", "speakingRooms"]
    const { userName } = useParams()
    const navigate = useNavigate()
    const [activeRoomtype, setActiveRoomtype] = useState(roomTypes[0])
    const [userInfo, setUserInfo] = useState()
    const [pics, setPics] = useState({
        avatar: "",
        coverPhoto: "",
    })
    const [rooms, setRooms] = useState([])
    const [wrongImgType, setWrongImgType] = useState(false)

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

    const { data: photoUpdatedData, mutate, isPending } = useMutation({
        mutationKey: ["update-pic"],
        mutationFn: photoUpdation,
        retry: 0,
    })
    const { data: profileData, isLoading: userInfoLoading, refetch: userRefetch, isFetching: userFetching, isError } = useQuery({
        queryKey: ["profile-data"],
        queryFn: () => getUserbyUserName(userName),
        refetchOnWindowFocus: false,
        retry: 0,
    })

    const uploadImage = (e, type, savedAt) => {
        const file = e.target.files[0]
        if (file?.type === "image/png" || file?.type === "image/jpeg") {
            setWrongImgType(false)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPics(prev => ({ ...prev, [savedAt]: reader.result }))
                mutate({
                    userId: user?.id,
                    photo: reader.result,
                    type
                })
            }
            reader.readAsDataURL(file)

        }
        else {
            setWrongImgType(true)
        }
    }

    useEffect(() => {
        if (profileData?.data) {
            setUserInfo(profileData?.data?.userData)
            setPics({
                avatar: profileData?.data?.userData?.avatar,
                coverPhoto: profileData?.data?.userData?.coverPhoto
            })
        }
    }, [profileData])

    useEffect(() => {
        if (photoUpdatedData?.data?.message) {
            toast(photoUpdatedData?.data?.message)
        }
    }, [photoUpdatedData])

    useEffect(() => {
        if (wrongImgType) {
            toast.error("Wrong Image type, Please Select only JPG or PNG files")
            setWrongImgType(false)
        }
    }, [wrongImgType])

    useEffect(() => {
        if (isError) {
            toast.error("This user doesn't exist")
            navigate("/rooms")
        }
    }, [isError])

    // In case the username in the url is changed
    useEffect(() => {
        userRefetch()
    }, [userName])

    useEffect(() => {
        if (data?.data) {
            setRooms(data?.data?.roomDtos)
        }
    }, [data])

    useEffect(() => {
        if (activeRoomtype !== "speakingRooms")
            refetch()
    }, [activeRoomtype])

    useEffect(() => {
        if (speakersRoomData?.data) {
            setRooms(speakersRoomData?.data?.roomDtos)
        }
    }, [speakersRoomData])
    return (
        userInfoLoading || userFetching ? <LoadingContainer>
            <ThreeDots />
            <h3>Getting user info</h3>
        </LoadingContainer> : <ProfileWrapperStyled>
            <CoverContainer >
                <img src={pics?.coverPhoto ? pics?.coverPhoto : "/images/bgm.jpg"} alt="cover_img" />
                <span onClick={() => navigate("/rooms")} className='goBack'>
                    <IoChevronBackSharp size={20} />
                </span>
                {user?.id === userInfo?.id &&
                    <>
                        <label className='camera' htmlFor='cover_picker'>
                            <IoCameraOutline size={20} />
                        </label>
                        <input type='file' id="cover_picker" onChange={(e) => uploadImage(e, "Cover Photo", "coverPhoto")} />
                    </>}
            </CoverContainer>
            <ProfileContainer>
                <ImageContainer>
                    {pics?.avatar ? <img src={pics?.avatar} alt="user-pic" referrerPolicy='no-referrer' /> : <DummyImage userName={userInfo?.fullName?.charAt(0)} width={160} height={160} fontSize={2.5} />}
                    {user?.id === userInfo?.id && <>
                        <label htmlFor='avatar_picker'>
                            <IoCameraOutline size={"100%"} />
                        </label>
                        <input type='file' id="avatar_picker" onChange={(e) => uploadImage(e, "Profile Photo", "avatar")} style={{ display: "none" }} />
                    </>}
                </ImageContainer>
                <UserInfoContainer>
                    <h3>{userInfo?.fullName}</h3>
                    <p>@{userInfo?.userName}</p>
                </UserInfoContainer>
            </ProfileContainer>
            <AboutAndRoomContainer>
                <div className='aboutContainer'>
                    <h4>About Me</h4>
                    <div>
                        {userInfo?.about && <p>{userInfo?.about}</p>}
                        {!userInfo?.about && <p>Write something about yourself</p>}
                        <span onClick={() => {
                            const modal = document.querySelector(".about-modal")
                            modal.classList.add("open")
                            document.body.style.overflow = "hidden"
                        }}>
                            <GoPencil />
                        </span>
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
            <AboutModalStyled className='about-modal'>

                <div
                    onInput={(e) => {
                        const { target } = e
                        if (target.type === "text" && target.placeholder === "Write something about yourself")
                            if (target.value.length === 200) {
                                alert('Max length is 200');
                            }
                    }}

                    onClick={(e) => {
                        const { target } = e
                        if (target.tagName === "BUTTON" && target.dataset.action === "update") {
                            const aboutInput = e.currentTarget.querySelector('input[data-type="about"]');
                            if (!aboutInput.value.length) {
                                toast("Please write something about your self")
                            } else {
                                mutate({ userId: user?.id, about: aboutInput.value });
                            }
                        }
                    }
                    }

                >
                    <h4>About Me</h4>

                    <input type='text' data-type="about" defaultValue={userInfo?.about} placeholder='Write something about yourself' maxLength={200} />
                    <button data-action="update">Update</button>
                    <span onClick={() => {
                        const modal = document.querySelector(".about-modal")
                        modal.classList.remove("open")
                        document.body.style.overflow = "unset";
                    }}><MdCancel fontSize={18} /></span>
                </div>
            </AboutModalStyled>
        </ProfileWrapperStyled >
    )
}

export default Profile