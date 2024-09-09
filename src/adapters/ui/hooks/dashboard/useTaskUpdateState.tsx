import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {toast} from 'react-toastify';
import {useDependencies} from "../../../../contexts/DIContext";
import {AppDispatch} from "../../../../infrastructure/state/store";
import {updateTask} from "../../../../infrastructure/state/slices/taskSlice";
import {TaskStateEnum} from "../../../../core/entities/Task";

interface TaskUpdateParams {
    taskId: string,
    state: TaskStateEnum

}

const useTaskUpdateState = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {taskService} = useDependencies();
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, error} = useMutation(
        {
            mutationFn: (params: TaskUpdateParams) => {
                return taskService.updateTaskState(params.taskId, params.state)
            },
            onSuccess: async (data) => {
                dispatch(updateTask(data));
                queryClient.invalidateQueries('tasks');
                toast.success("Task update successful.")
            }
        });

    const handleTaskUpdateState = useCallback(
        (params: TaskUpdateParams) => {
            mutate(params);
        },
        [mutate]
    );

    return {
        handleTaskUpdateState,
        isPending,
        isError,
        error,
    };
};

export default useTaskUpdateState;
