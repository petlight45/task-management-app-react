import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {toast} from 'react-toastify';
import {useDependencies} from "../../../../contexts/DIContext";
import {AppDispatch} from "../../../../infrastructure/state/store";
import {updateTask} from "../../../../infrastructure/state/slices/taskSlice";
import {Task} from "../../../../core/entities/Task";

interface TaskUpdateParams {
    taskId: string,
    taskPayload: Partial<Task>

}

const useTaskUpdate = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {taskService} = useDependencies(); // Inject TaskService
    const queryClient = useQueryClient();


    const {mutate, isPending, isError, error} = useMutation(
        {
            mutationFn: (params: TaskUpdateParams) => {
                return taskService.updateTask(params.taskId, params.taskPayload)
            },
            onSuccess: async (data) => {
                dispatch(updateTask(data));
                queryClient.invalidateQueries('tasks');
                toast.success("Task update successful.")
            }
        });

    const handleTaskUpdate = useCallback(
        (params: TaskUpdateParams) => {
            mutate(params);
        },
        [mutate]
    );

    return {
        handleTaskUpdate,
        isPending,
        isError,
        error,
    };
};

export default useTaskUpdate;
