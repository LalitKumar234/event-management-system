"use client"
import { useEffect } from "react";
import { axiosPrivate } from "../config/http"
import Cookies from "js-cookie"

const useAxiosPrivate = () => {
    const token = Cookies.get('access_token')

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [token]);

    return axiosPrivate;
};

export default useAxiosPrivate;
