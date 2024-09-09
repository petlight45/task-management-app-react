import {useQuery} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {useDependencies} from "../../../../contexts/DIContext";
import {AppDispatch} from "../../../../infrastructure/state/store";
import {setAllUsers} from "../../../../infrastructure/state/slices/userSlice";
import {useEffect} from "react";


const useAllUsersFetch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {authService} = useDependencies(); // Inject UserService

    const {data, error, isLoading, isFetched, isSuccess} = useQuery({
        queryKey: ['users'],
        refetchInterval: 1000 * 60,
        retry: 5,
        retryDelay: 5 * 1000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        queryFn: () => authService.fetchUsers({ordering: "username"}),
    });

    useEffect(() => {
        if (isFetched && isSuccess && data) {
            dispatch(setAllUsers(data)); // Sync with Redux
        }

    }, [isFetched, isSuccess, data])
    return {data, error, isLoading};
};

export default useAllUsersFetch;