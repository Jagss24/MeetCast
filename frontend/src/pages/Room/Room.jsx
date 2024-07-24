import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { RoomConatiner, Title, About, SpeakerConatiners, EachSpeaker, ButtonConatiners, Spinner, LoadingContainer } from './Room.styled'
import Meet from '../../components/Meet/Meet'
import Podcast from '../../components/Podcast/Podcast'
import { getSingleRoom } from '../../api/api'
import { useQuery } from '@tanstack/react-query'
import DummyImage from '../../components/DummyImage'
import { ThreeDots } from 'react-loading-icons'

const Room = () => {
    const { id: roomId } = useParams()
    const { user } = useSelector(state => state.user)
    const [meet, setMeet] = useState(false)
    const [podcast, setPodCast] = useState(false)
    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["get-single-room", roomId],
        queryFn: () => getSingleRoom(roomId),
        retry: 0,
        refetchOnWindowFocus: false
    })
    const room = data?.data?.room

    useEffect(() => {
        if (isError) {
            alert("Not a Valid room Id")
            navigate("/rooms")
        }
    }, [isError])
    return (
        isLoading ?
            <LoadingContainer>
                <ThreeDots />
                <h3>Setting you up please wait</h3>
            </LoadingContainer> :
            <RoomConatiner>
                {!meet && (
                    <>
                        <Title>{room?.topic}</Title>
                        <About>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste obcaecati nihil quaerat maxime, voluptates, corporis culpa magni facilis nobis voluptatibus natus quis placeat unde, dolores assumenda. Suscipit voluptates expedita blanditiis minima, ab consectetur perspiciatis architecto distinctio, vitae magni cumque sunt nisi culpa recusandae dolorum nobis incidunt dolorem vel nam fuga!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea libero harum enim modi commodi eligendi incidunt eaque iste, cumque delectus iusto omnis, tempore ipsa. Deserunt fugiat non fugit atque earum velit ratione quaerat quas facere molestiae vel incidunt dolore distinctio provident mollitia dignissimos nihil, ex sequi, enim est odio! Totam nesciunt maxime sapiente culpa, laborum numquam minus excepturi eum atque veniam, ipsa voluptatum, consequatur commodi quod dolore fugiat. Aspernatur, eligendi voluptatibus, cupiditate sit soluta fugit quasi ea, maiores vero odio sint deserunt voluptates officia nemo quod. Libero qui vel perspiciatis eos magni aperiam autem, nostrum quae deleniti accusamus voluptate aliquam.
                        </About>
                        <SpeakerConatiners>
                            <h3>Speakers</h3>
                            <div>
                                {room?.speakers.map((speaker) => <EachSpeaker key={speaker?._id}>
                                    {speaker?.avatar ?
                                        <img
                                            src={speaker.avatar}
                                            alt={`${speaker.fullName}'s avatar`}
                                        /> : <DummyImage userName={speaker?.fullName?.charAt(0).toUpperCase()} width={60} height={60} />}

                                    <p>{speaker?.fullName}</p>
                                </EachSpeaker>)}

                            </div>


                        </SpeakerConatiners>
                        <ButtonConatiners>
                            <button disabled={isLoading || !roomId || !user?.id}
                                onClick={() => setMeet(true)}>Join the Room
                                <span>{(isLoading || !roomId || !user?.id) && <Spinner width={15} height={15} />}</span>
                            </button>

                            <button onClick={() => navigate("/rooms")}>
                                Return to rooms
                            </button>
                        </ButtonConatiners>
                    </>)}
                {
                    meet && roomId && user?.id && <Meet
                        user={user}
                        roomId={roomId}
                    />
                }
                {
                    podcast && roomId && user?.id && <Podcast
                        user={user}
                        roomId={roomId}
                    />
                }
            </RoomConatiner>
    )
}

export default Room
