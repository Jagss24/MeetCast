import React, { memo, useEffect, useState } from 'react'
import { StartRoomContainer, StartRoomBody, StartRoomHeader, StartRoomFooter, RoomTypes, RoomType, RoomTitle, AccessiBility, AccessiBilityOptions, AccessiBilityText, OptionOuterStyled, AssignSpeakerConatiner } from './StartRoom.styled'
import { SearchInput } from '../shared/Navigation/Navigation.styled';
import { HiXMark } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query"
import { createRoom, searchUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { FaPodcast } from "react-icons/fa6";
import { MdVideoCall } from "react-icons/md";
import AsyncSelect from 'react-select/async';
import { components } from "react-select"
import DummyImage from '../DummyImage';
import { useSelector } from 'react-redux';


const StartRoom = ({ closeModal }) => {
    const navigate = useNavigate()
    const roomType = ["podcast", "meet"]
    const [activeRoom, setActiveRoom] = useState(roomType[0])
    const [topic, setTopic] = useState("")
    const [accessibility, setAccessibility] = useState("public")
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
    useEffect(() => {
        if (data?.data) {
            const roomId = data?.data?.roomDtos?.id
            navigate(`/room/${roomId}`)
        }
    }, [data])

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

    return (
        <StartRoomContainer>
            <StartRoomBody>
                <StartRoomHeader>
                    <h3>Enter the topic to be discussed</h3>
                    <SearchInput fullWidth={true} value={topic} onChange={(e) => setTopic(e.target.value)} />
                    <span>Room types</span>
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
                </StartRoomHeader>
                {activeRoom === "podcast" && <AccessiBility>
                    <h4>Accessibility Options:</h4>
                    <AccessiBilityOptions>
                        <span>
                            <input
                                type='radio'
                                name="accessibility"
                                id="public"
                                value="public"
                                checked={accessibility === "public"}
                                onChange={(e) => setAccessibility(e.target.value)}
                            />
                            <label htmlFor='public'>Public</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                name="accessibility"
                                id="private"
                                value="private"
                                checked={accessibility === "private"}
                                onChange={(e) => setAccessibility(e.target.value)}
                            />
                            <label htmlFor='private'>Private</label>
                        </span>
                    </AccessiBilityOptions>
                </AccessiBility>}
                {activeRoom === "meet" && <AccessiBilityText>
                    <p>If room type is Meet then it will always be private</p>
                </AccessiBilityText>}
                <AssignSpeakerConatiner>
                    <h6>Assign speakers to your podcast :</h6>
                    <AsyncSelect
                        isSearchable={true}
                        isMulti={true}
                        onChange={handleChange}
                        value={selectedUser}
                        menuPortalTarget={document.body}
                        placeholder={"Search users"}
                        components={{ Option, NoOptionsMessage }}
                        loadOptions={loadOptions}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                background: "#262626",
                                border: "none",
                                outline: "none",
                                cursor: state.isDisabled ? 'not-allowed' : 'text'
                            }),

                            menu: (provided) => ({
                                ...provided,
                                color: '#fff',
                                cursor: "pointer",
                                background: "#262626",
                            }),
                            input: (provided) => ({
                                ...provided,
                                color: '#fff',  // Change text color of the input field
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
                                backgroundColor: state.isFocused ? "#353535" : "",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: state.isFocused ? "#353535" : ""
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
                <StartRoomFooter>
                    <span>{activeRoom === "podcast" ? `Start a podcast, ${accessibility === "public" ? "open to everyone" : "private with your people"} ` : "Start a Meet, with your people"}</span>
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