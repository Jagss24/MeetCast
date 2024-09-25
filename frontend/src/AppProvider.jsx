import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { autoReLogin } from "./api/api";
import { setUser } from "./slices/userSlice";
import App from './App';
import AppLoader from './AppLoader';

const AppProvider = () => {
    const { isAuth, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userisSet, setUserisSet] = useState(false)
    const { data, isSuccess, refetch, isFetching } = useQuery({
        queryKey: ["user-login"],
        queryFn: () => autoReLogin(),
        enabled: false,
        retry: 0,
    });
    console.log({ isAuth })
    useEffect(() => {
        if (!user?.userName) {
            refetch();
        }
    }, []);

    useEffect(() => {
        if (data?.data?.userData) {
            dispatch(setUser(data?.data?.userData));
            setUserisSet(true)
        }
        else if (data?.data?.message === "Your Session has expired. Please Login again") {
            setUserisSet(true)
        }
        else if (data?.data?.message === "No user found") {
            setUserisSet(true)
        }
    }, [isSuccess]);

    if (isFetching || !userisSet) {
        return <AppLoader />
    }

    return <App isAuth={isAuth} user={user} />



}

export default AppProvider