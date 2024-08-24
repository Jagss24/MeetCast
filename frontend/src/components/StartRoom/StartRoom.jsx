import React, { memo, useEffect, useState } from 'react'
import { StartRoomContainer, StartRoomBody, StartRoomHeader, StartRoomFooter, RoomTypes, RoomType, RoomTitle, AccessiBility, OptionOuterStyled, AssignSpeakerConatiner, AccessibilityType, StartRoomBase, TopicDiv } from './StartRoom.styled'
import { HiXMark } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query"
import { createRoom, searchUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { FaPodcast } from "react-icons/fa6";
import { MdVideoCall } from "react-icons/md";
import AsyncSelect from 'react-select/async';
import Select, { components } from "react-select"
import DummyImage from '../DummyImage';
import { useSelector } from 'react-redux';


const StartRoom = ({ closeModal }) => {
    const navigate = useNavigate()
    const roomType = ["podcast", "meet"]
    const [activeRoom, setActiveRoom] = useState(roomType[0])
    const [topic, setTopic] = useState("")
    const [accessibility, setAccessibility] = useState("public")
    const [openTopicOptions, setOpenTopicOptions] = useState(false)
    const [selectedUser, setSelectedUser] = useState([])
    const { user } = useSelector(state => state.user)

    const handleCreateRoom = () => {
        if (topic.split(" ").length < 2) {
            return alert("Topic should be atleast of 2 words")
        }
        mutate({
            topic: topic,
            roomType: activeRoom,
            accessibility: activeRoom === "meet" ? "private" : accessibility,
            speakers: selectedUser
        })
    }

    const { data, mutate } = useMutation({
        mutationFn: createRoom,

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

    const loadOptions = async (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
        } else {
            try {
                const result = await searchUser(inputValue);
                const fetchedUsers = result.data.users.filter(eachUser => eachUser._id !== user.id)
                    .map(user => ({
                        value: user._id,
                        label: user.fullName,
                        avatar: user.avatar,
                        userName: user.userName
                    }))
                callback(fetchedUsers);
            } catch (error) {
                console.error("Error searching users:", error);
                callback([]);
            }
        }
    };

    const handleChange = (selected) => {
        if (selected.length > 3) {
            alert("You can only select up to 3 options.");
            return; // Prevent updating state with more than 3 options
        }
        setSelectedUser(selected);
    };
    useEffect(() => {
        if (data?.data) {
            const roomId = data?.data?.roomDtos?.id
            navigate(`/room/${roomId}`)
        }
    }, [data])

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        // Cleanup on component unmount or when modal closes
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    return (
        <StartRoomContainer>
            <StartRoomBody>
                <StartRoomHeader>
                    <span>Room Type</span>
                    <RoomTypes>
                        <div>
                            <RoomType roomType={activeRoom === "podcast"} onClick={() => setActiveRoom(roomType[0])}>
                                <FaPodcast />
                                <RoomTitle>Podcast</RoomTitle>
                            </RoomType>
                        </div>
                        <div>
                            <RoomType roomType={activeRoom === "meet"} onClick={() => setActiveRoom(roomType[1])}>
                                <MdVideoCall size={20} />
                                <RoomTitle>Meet</RoomTitle>
                            </RoomType>
                        </div>
                    </RoomTypes>
                    <AccessiBility>
                        {activeRoom === "meet" && <AccessibilityType>
                            If room type is Meet then it will always be private
                        </AccessibilityType>}
                        {activeRoom === "podcast" && <div>
                            <AccessibilityType accessibility={accessibility === "public"} onClick={() => setAccessibility("public")}>
                                Public
                            </AccessibilityType>
                            <AccessibilityType accessibility={accessibility === "private"} onClick={() => setAccessibility("private")}>
                                Private
                            </AccessibilityType>
                        </div>}
                        <span>{activeRoom === "podcast" ? `Start a podcast, ${accessibility === "public" ? "open to everyone" : "private with your people"} ` : "Start a Meet, with your people"}</span>
                        <TopicDiv>
                            <h4>About What? </h4>
                            <Select
                                options={topicOptions}
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        background: "#000000",
                                        border: "1px solid #20bd5f",
                                        borderRadius: "22px",
                                        outline: "none",
                                        cursor: state.isDisabled ? 'not-allowed' : 'text',
                                        width: "12rem",

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
                                    multiValue: (provided) => ({
                                        ...provided,
                                        borderRadius: "20px",
                                        background: " #353535",
                                        "&>div": {
                                            color: "#fff",

                                        },
                                        "&>div[role=button]": {
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "#fff",
                                                backgroundColor: "#ababaa",
                                                borderRadius: "20px",
                                            }
                                        }
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
                    </AccessiBility>
                </StartRoomHeader>
                <StartRoomBase>
                    <h3>Title of the room</h3>
                    <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder='Enter your room title...' />
                    <h3>Description of the room</h3>
                    <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder='Say something about your room...' />
                    <AssignSpeakerConatiner>
                        <h6>Assign speakers to your podcast :</h6>
                        <AsyncSelect
                            isSearchable={true}
                            isMulti={true}
                            onChange={handleChange}
                            value={selectedUser}
                            menuPlacement='top'
                            placeholder={"Search users"}
                            components={{ Option, NoOptionsMessage }}
                            loadOptions={loadOptions}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    background: "#fff",
                                    border: "none",
                                    outline: "none",
                                    cursor: state.isDisabled ? 'not-allowed' : 'text',
                                    borderRadius: "11px",
                                }),
                                input: (provided, state) => ({
                                    ...provided,
                                    color: "#20bd5f",
                                    padding: "5px 0"
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    color: '#262626',
                                    cursor: "pointer",
                                    background: "#fff",
                                }),
                                multiValue: (provided) => ({
                                    ...provided,
                                    borderRadius: "20px",
                                    background: " #353535",
                                    "&>div": {
                                        color: "#fff",

                                    },
                                    "&>div[role=button]": {
                                        cursor: "pointer",
                                        "&:hover": {
                                            color: "#fff",
                                            backgroundColor: "#ababaa",
                                            borderRadius: "20px",
                                        }
                                    }
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    color: 'black',
                                    backgroundColor: state.isFocused ? "#20bd5f33" : "",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: state.isFocused ? "#20bd5f33" : ""
                                    }
                                }),
                                indicatorsContainer: (provided) => ({
                                    ...provided,
                                    display: 'none',  // Hide indicators
                                }),
                                indicatorSeparator: (provided) => ({
                                    ...provided,
                                    display: 'none',  // Hide indicator separator
                                }),

                            }}
                        />
                    </AssignSpeakerConatiner>
                </StartRoomBase>
                <StartRoomFooter>
                    <button onClick={handleCreateRoom}>
                        <span >Let's go</span></button>
                </StartRoomFooter>

                <span onClick={closeModal}>
                    <HiXMark color={"#fff"} size={20} />
                </span>
            </StartRoomBody>
        </StartRoomContainer >
    )
}

export default memo(StartRoom)

const Option = (props) => {
    return (
        <components.Option {...props}>
            <OptionOuterStyled>
                {props?.data?.avatar ? <img src={props.data.avatar} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%' }} /> : <DummyImage height={30} width={30} userName={props?.data?.label?.charAt(0)} />}
                <span>
                    <span>{props.data.label}</span>
                    <p style={{ fontSize: '12px', color: 'gray' }}>@{props.data.userName}</p>
                </span>
            </OptionOuterStyled>
        </components.Option>
    );
};

const NoOptionsMessage = (props) => {
    return (
        <components.NoOptionsMessage {...props}>
            <div style={{ color: '#808080', textAlign: 'center' }}>Search users with Fullname or Username</div>
        </components.NoOptionsMessage>
    );
}