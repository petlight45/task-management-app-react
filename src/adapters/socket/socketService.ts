import {io} from 'socket.io-client';
import {useQueryClient} from '@tanstack/react-query';
import AppConfig from "../../infrastructure/config";
import LocalStorage from "../storage/localStorage";
import {useEffect, useRef} from "react";

const socket = io(AppConfig.WS_SERVER_BASE_URL, {
    path: "",
    auth: {
        token: LocalStorage.getItem('accessToken')
    },
});

export const useSocketEvents = () => {
    const queryClient = useQueryClient();
    const isSocketInitiated = useRef<boolean>(false)

    useEffect(() => {
        if (!isSocketInitiated.current) {
            const handleNotification = (payload: any) => {
                // const {type, data} = payload;
                queryClient.invalidateQueries('tasks');
            };

            socket.on('notification', handleNotification);
            isSocketInitiated.current = true;
            return () => {
                socket.off('notification', handleNotification);
            };
        }

    }, [queryClient])
};
