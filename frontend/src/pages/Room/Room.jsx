import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { RoomConatiner, Title, About, UserContainers, EachSpeaker, ButtonConatiners, Spinner, LoadingContainer, SpeakerContainer, AllowContainer, DeclinedText, ShareContainer, SuccessText } from './Room.styled'
import Meet from '../../components/Meet/Meet'
import Podcast from '../../components/Podcast/Podcast'
import { getSingleRoom, requestToJoinRoom, addMemberToRoom, removeMemberFromRoom } from '../../api/api'
import { useQuery, useMutation } from '@tanstack/react-query'
import DummyImage from '../../components/DummyImage'
import { ThreeDots } from 'react-loading-icons'
import { IoShareSocialSharp } from "react-icons/io5";
import { setIsNavbarVisible } from '../../slices/utilitySlice'
import toast from 'react-hot-toast'

const Room = () => {
    const { id: roomId } = useParams()
    const { user } = useSelector(state => state.user)
    const [roomType, setRoomType] = useState("")
    const [userisAlreadyinWaitingList, setuserisAlreadyinWaitingList] = useState(false)
    const [userisInMemberList, setuserisInMemberList] = useState(false)
    const [userisInRemovedList, setuserisInRemovedList] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    // Queries & Mutations
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["get-single-room", roomId],
        queryFn: () => getSingleRoom(roomId),
        retry: 0,
        refetchOnWindowFocus: false
    })

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["req-to-join"],
        mutationFn: requestToJoinRoom
    })

    const { isPending: isAddMemberPending, isSuccess: isAddMemberSucces, mutate: addMemberMutate } = useMutation({
        mutationKey: ["add-member-to-room"],
        mutationFn: addMemberToRoom
    })

    const { isSuccess: isRemoveMemberSuccess, mutate: removeMemberMutate } = useMutation({
        mutationKey: ["remove-member-to-room"],
        mutationFn: removeMemberFromRoom
    })
    const room = data?.data?.roomDtos

    //Functions
    const handleRequestiontoJoinRoom = async (roomId, userId) => {
        if (!roomId && !userId) {
            toast("Some error occured")
            return
        }
        mutate({
            userId, roomId
        })
    }

    const handleAddMemberToRoom = async (roomId, userId) => {
        if (!roomId && !userId) {
            toast("Some error occured")
        }
        addMemberMutate({
            userId, roomId
        })
    }

    const handleRemoveMemberFromRoom = async (roomId, userId) => {
        if (!roomId && !userId) {
            toast("Some error occured")
        }
        removeMemberMutate({
            userId, roomId
        })
    }

    const handleIsSpeaker = (userId) => {
        const isUserSpeaker = room?.speakers.find((speaker) => speaker?._id === userId)

        if (isUserSpeaker) {
            return true
        }
        return false
    }

    //useEffects
    useEffect(() => {
        if (isError) {
            toast.error("Not a Valid room Id")
            navigate("/rooms")
        }
    }, [isError])

    useEffect(() => {
        if (room?.id && user?.id) {
            setuserisAlreadyinWaitingList(room?.waitingList?.some(eachUser => eachUser?._id === user?.id))
            setuserisInMemberList(room?.memberList?.some(eachUser => eachUser?._id === user?.id))
            setuserisInRemovedList(room?.removedList?.some(eachUser => eachUser?._id === user?.id))
        }
    }, [room, user])


    useEffect(() => {
        if (isAddMemberSucces) {
            refetch()
        }
    }, [isAddMemberSucces])


    useEffect(() => {
        if (isRemoveMemberSuccess) {
            refetch()
        }
    }, [isRemoveMemberSuccess])
    return (
        isLoading ?
            <LoadingContainer>
                <ThreeDots />
                <h3>Setting you up please wait</h3>
            </LoadingContainer> :
            <RoomConatiner notAllowPadding={roomType === "meet" || roomType === "podcast"}>
                {!roomType && (
                    <>
                        <Title>{room?.topic}</Title>
                        <About>{room?.description}</About>
                        <UserContainers isCenter={room?.accessibility === "public" || user?.id !== room?.ownerId?._id}>
                            <SpeakerContainer>
                                <h3>Speakers</h3>
                                <div>
                                    {room?.speakers.map((speaker) => <EachSpeaker key={speaker?._id}>
                                        <div onClick={() => navigate(`/profile/${speaker?.userName}`)}>
                                            {speaker?.avatar ?
                                                <img
                                                    src={speaker.avatar}
                                                    alt={`${speaker.fullName}'s avatar`}
                                                /> : <DummyImage userName={speaker?.fullName?.charAt(0).toUpperCase()} width={50} height={50} />}

                                            <p>{speaker?.fullName}</p>
                                        </div>
                                        <div>
                                            <p>{speaker?._id === room?.ownerId?._id ? "Host" : "Speaker"}</p>
                                        </div>
                                    </EachSpeaker>)}
                                </div>

                            </SpeakerContainer>
                            {user?.id === room?.ownerId?._id && room?.accessibility !== "public" && <AllowContainer >
                                <h3>Waiting List</h3>
                                <div>
                                    {room?.waitingList?.length ? room?.waitingList.map((eachUser) => <EachSpeaker key={eachUser?._id}>
                                        <div>
                                            {eachUser?.avatar ?
                                                <img
                                                    src={eachUser.avatar}
                                                    alt={`${eachUser.fullName}'s avatar`}
                                                /> : <DummyImage userName={eachUser?.fullName?.charAt(0).toUpperCase()} width={50} height={50} />}

                                            <p>{eachUser?.fullName}</p>
                                        </div>
                                        <div className='buttons'>
                                            <button onClick={() => handleAddMemberToRoom(roomId, eachUser?._id)}>
                                                Accept
                                                {isAddMemberPending && <Spinner width={12} height={12} />}
                                            </button>
                                            <button className='decline' onClick={() => handleRemoveMemberFromRoom(roomId, eachUser?._id)}>Decline</button>
                                        </div>
                                    </EachSpeaker>) : <div>No user is present in the waiting list</div>}
                                </div>
                            </AllowContainer>}
                        </UserContainers>

                        {userisInRemovedList && !isSuccess && <DeclinedText>User has declined your request</DeclinedText>}
                        {userisAlreadyinWaitingList && <SuccessText>Your request has already been sent. Wait for the Host to accept it.</SuccessText>}
                        {isSuccess && <SuccessText> Your request has been sent</SuccessText>}
                        <ButtonConatiners>
                            {room?.accessibility === "public" || user?.id === room?.ownerId?._id || userisInMemberList ?
                                <button disabled={isLoading || !roomId || !user?.id}
                                    onClick={() => {
                                        setRoomType(room?.roomType)
                                        dispatch(setIsNavbarVisible(false))
                                    }}>Join the Room
                                    {(isLoading || !roomId || !user?.id) && <span> <Spinner width={15} height={15} /> </span>}
                                </button>
                                : <button disabled={isLoading || !roomId || !user?.id || isSuccess || userisAlreadyinWaitingList}
                                    onClick={() => handleRequestiontoJoinRoom(roomId, user?.id)}>
                                    {userisAlreadyinWaitingList ? "Already requested" : isSuccess ? "Request Sent" : userisInRemovedList ? "Request Again" : userisInMemberList ? "Join the Room" : "Request to Join the room"}
                                    {(isLoading || !roomId || !user?.id || isPending) && <span><Spinner width={15} height={15} />  </span>}
                                </button>
                            }

                            <button onClick={() => navigate("/rooms")}>
                                Return to rooms
                            </button>
                        </ButtonConatiners>
                        <ShareContainer onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                            toast.success("Link copied to your Clipboard", {
                                position: "bottom-right"
                            })
                        }}>
                            <span>
                                <IoShareSocialSharp size={20} />
                            </span>
                        </ShareContainer>
                    </>)
                }
                {
                    roomType === "meet" && roomId && user?.id && <Meet
                        user={{
                            id: user?.id,
                            fullName: user?.fullName,
                            userName: user?.userName,
                            avatar: user?.avatar
                        }}
                        roomId={roomId}
                        roomTopic={room.topic}
                    />
                }
                {
                    roomType === "podcast" && roomId && user?.id && <Podcast
                        user={user}
                        roomId={roomId}
                        isSpeaker={handleIsSpeaker(user?.id)}
                        isOwner={user?.id === room?.ownerId?._id}
                    />
                }
            </RoomConatiner >
    )
}

export default Room
