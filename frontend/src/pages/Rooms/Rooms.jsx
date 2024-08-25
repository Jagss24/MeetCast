import React, { useEffect, useState } from 'react'
import { RoomComponent, RoomCardContainer, RoomNav, FirstChild, Buttons, LoadingDiv } from './Rooms.styled'
import { MdOutlineKeyboardArrowDown, MdVoiceChat } from "react-icons/md";
import RoomCard from '../../components/RoomCard/RoomCard';
import StartRoom from '../../components/StartRoom/StartRoom';
import { useQuery } from '@tanstack/react-query';
import { getRooms, getRoomsByTopic } from '../../api/api';
import { Grid } from "react-loading-icons"
import { TopicDiv } from '../../components/StartRoom/StartRoom.styled';
import Select from "react-select"
const Rooms = () => {
    const [showModal, setShowModal] = useState(false)
    const [rooms, setRooms] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [openTopicOptions, setOpenTopicOptions] = useState({
        label: "",
        value: ""
    })
    const topicOptions = [{
        label: "Health",
        value: "Health"
    },
    {
        label: "Art",
        value: "Art"
    },
    {
        label: "Fitness",
        value: "Fitness"
    }, {
        label: "Finance",
        value: "Finance"
    }, {
        label: "Medical",
        value: "Medical"
    },
    {
        label: "Engineering",
        value: "Engineering"
    },
    {
        label: "Politics",
        value: "Politics"
    }
    ]
    const { data, isLoading, refetch: allRoomsRefetch } = useQuery({
        queryKey: ["get-rooms"],
        queryFn: getRooms,
        refetchOnWindowFocus: false,
    })

    const { data: roomsByTopicData, refetch, isFetching } = useQuery({
        queryKey: ["room-by-topic"],
        queryFn: () => getRoomsByTopic(selectedFilter),
        refetchOnWindowFocus: false,
        enabled: false
    })
    useEffect(() => {
        if (data?.data) {
            setRooms(data?.data?.roomDtos)
        }
    }, [data])

    useEffect(() => {
        if (selectedFilter === "all") {
            allRoomsRefetch()
        }
        else {
            refetch()
        }
    }, [selectedFilter])

    useEffect(() => {
        if (roomsByTopicData?.data) {
            setRooms(roomsByTopicData?.data?.roomDtos)
        }
    }, [roomsByTopicData])

    console.log({ rooms })
    return (
        <>
            <RoomComponent>
                <RoomNav>
                    <FirstChild>
                        <Buttons active={selectedFilter === "all"} onClick={() => {
                            setSelectedFilter("all")
                            setOpenTopicOptions({ label: "", value: "" })
                        }}>
                            <span >All Voice rooms</span>
                        </Buttons>
                        <TopicDiv>
                            <Select
                                onChange={(selected) => {
                                    console.log({ selected })
                                    setOpenTopicOptions({
                                        label: selected.label,
                                        value: selected.value
                                    })
                                    setSelectedFilter(selected.value)
                                }}
                                value={openTopicOptions.label && openTopicOptions.value ? openTopicOptions : null}
                                options={topicOptions}
                                placeholder="Topics"
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        background: "rgba(131, 130, 130, 0.2)",
                                        borderRadius: "22px",
                                        border: "none",
                                        outline: "none",
                                        cursor: "pointer",
                                        width: "10rem",

                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: "#fff",
                                        fontWeight: "600",
                                    }),
                                    valueContainer: (provided, state) => ({
                                        ...provided,
                                        color: "#20bd5f"
                                    }),
                                    singleValue: (provided, state) => ({
                                        ...provided,
                                        color: "#20bd5f"
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        cursor: "pointer",
                                        background: "#000000",
                                        width: "100%",
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        color: '#20bd5f',
                                        backgroundColor: state.isFocused ? "#353535" : "",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: state.isFocused ? "#353535" : "",

                                        },
                                    }),
                                    indicatorSeparator: (provided) => ({
                                        ...provided,
                                        display: 'none',  // Hide indicator separator
                                    }),

                                }}

                            />
                        </TopicDiv>
                    </FirstChild>
                    <Buttons onClick={() => setShowModal(true)} active={true}>
                        <MdVoiceChat color='rgb(32, 189, 95)' size={18} />
                        <span>Start a room</span>
                    </Buttons>
                </RoomNav>
                {isLoading || isFetching ?
                    <LoadingDiv >
                        <Grid speed={3} />
                        <span> Please wait rooms are loading...</span>
                    </LoadingDiv> : <RoomCardContainer>
                        {
                            (rooms || [])?.map((room, index) => <RoomCard key={index} room={room}></RoomCard>)
                        }
                    </RoomCardContainer>
                }
            </RoomComponent >
            {showModal && <StartRoom closeModal={() => setShowModal(false)} />
            }
        </>
    )
}

export default Rooms