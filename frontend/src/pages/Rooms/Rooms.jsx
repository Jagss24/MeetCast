import React, { useEffect, useState } from 'react'
import { RoomComponent, RoomCardContainer, RoomNav, FirstChild, Buttons, LoadingDiv } from './Rooms.styled'
import { MdVoiceChat } from "react-icons/md";
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
                                    control: (provided) => ({
                                        ...provided,
                                        background: "var(--primary-color)",
                                        borderRadius: "22px",
                                        border: "1px solid var(--border-color)",
                                        outline: "none",
                                        cursor: "pointer",
                                        width: "10rem",
                                        "@media (max-width: 768px)": {
                                            justifyContent: "start",
                                            width: "fit-content",
                                            flexWrap: "nowrap"
                                        }

                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: "#fff",
                                        fontWeight: "600",
                                    }),
                                    valueContainer: (provided, state) => ({
                                        ...provided,
                                        color: "#fff"
                                    }),
                                    singleValue: (provided, state) => ({
                                        ...provided,
                                        color: "#fff"
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        cursor: "pointer",
                                        background: "var(--primary-color)",
                                        border: "1px solid var(--border-color)",
                                        width: "100%",
                                        "@media (max-width: 768px)": {
                                            width: "10rem"
                                        }
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        color: "#fff",
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
                        <MdVoiceChat size={18} />
                        <span className='hide'>Start a room</span>
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