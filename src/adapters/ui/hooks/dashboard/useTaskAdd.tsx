import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {toast} from 'react-toastify';
import {useDependencies} from "../../../../contexts/DIContext";
import {AppDispatch} from "../../../../infrastructure/state/store";
import {addTask} from "../../../../infrastructure/state/slices/taskSlice";
import {Task} from "../../../../core/entities/Task";
import {useDashboardContext} from "../../../../contexts/DashboardContext";

interface TaskAddParams {
    taskPayload: Partial<Task>

}

const useTaskAdd = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {taskService} = useDependencies(); // Inject TaskService
    const queryClient = useQueryClient();
    const {setCurrentTaskInView} = useDashboardContext()


    const {mutate, isPending, isError, error} = useMutation(
        {
            mutationFn: (params: TaskAddParams) => {
                return taskService.createTask(params.taskPayload)
            },
            onSuccess: async (data) => {
                dispatch(addTask(data));
                queryClient.invalidateQueries('tasks');
                setCurrentTaskInView(data)
                toast.success("Task create successful.")
            }
        });

    const handleTaskAdd = useCallback(
        (params: TaskAddParams) => {
            mutate(params);
        },
        [mutate]
    );

    return {
        handleTaskAdd,
        isPending,
        isError,
        error,
    };
};

export default useTaskAdd;
