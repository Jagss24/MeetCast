
# MeetCast - Meet & Podcast

**MeetCast** combines the concept of meetings and podcasts into a single platform. Users can host both **podcasts** and **meets**, create public or private rooms, and engage in meaningful conversations.

## Features
- Users can signup/login manually or via Google accounts.
- Create rooms as either podcasts or meets.
- Rooms can be **public** or **private**:
     - **Public Podcast:** Open to everyone; only the host and speakers can speak.
    - **Private Room:** Restricted to accepted participants who can all communicate.
- Filter rooms by assigning specific topics.
- *Meets* are always private, allowing users to:
    - Turn on/off their audio or video.
    - **Share their screen**.
    - Use chat for communication.
- Podcasts are **similar to meet** but do not allow video or screen sharing.
- Only public rooms are displayed publicly; private ones remain hidden.
- Users can edit their section to personalize their profiles.

## Tech Stack

**Frontend:** React, Tailwind css, Tanstack-query, socket.io-client

**Backend:** Nodejs, Expressjs, MongoDB, socket.io, nodemailer, JWT

## Test credentials

email: test1@gmail.com, test2@gmail.com

password: test123 (same for both acc)

## Deployment

*Note:- Backend is deployed on **render** free instace as it supports socket.io & frontend is deployed on **vercel**. Might take some time to load initially*

[Live Link](https://meet-cast.vercel.app/)

## Acknowledgments

This project’s audio functionality is based on [Coder's Gyan's](https://www.youtube.com/@CodersGyan) YouTube playlist on [WebRTC using MERN Stack](https://www.youtube.com/playlist?list=PLXQpH_kZIxTVz45ifrI_gOqpo7AmdaHRp). While the original was a voice chat application focused on podcasts, I have added extra features such as filtering, meet functionality, room joining, public and private room types, and more.

## Demo/Explanation of the project

[Demo Video](https://www.youtube.com/watch?v=YaDY0iMUnYc)






