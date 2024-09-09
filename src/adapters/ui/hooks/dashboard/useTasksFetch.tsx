import {useQuery} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useDependencies} from "../../../../contexts/DIContext";
import {AppDispatch} from "../../../../infrastructure/state/store";
import {setTasks} from "../../../../infrastructure/state/slices/taskSlice";
import {useEffect} from "react";


const useTasksFetch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {taskService} = useDependencies(); // Inject TaskService

    const {data, error, isLoading, isFetched, isSuccess} = useQuery({
        queryKey: ['tasks'],
        refetchInterval: 1000*60,
        retry:5,
        retryDelay:5*1000,
        refetchOnReconnect:true,
        refetchOnWindowFocus:true,
        queryFn: () => taskService.fetchTasks({expansion: "ownerId,assigneeId", ordering:"dueDate"}),
    });

    useEffect(()=>{
        if (isFetched && isSuccess && data){
            dispatch(setTasks(data)); // Sync with Redux
        }

    }, [isFetched, isSuccess, data])

    return {data, error, isLoading};
};

export default useTasksFetch;