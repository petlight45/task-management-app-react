import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'react-toastify';
import {useDependencies} from "../../../../contexts/DIContext";

interface TaskDeleteParams {
    taskId: string

}

const useTaskDelete = () => {
    const {taskService} = useDependencies(); // Inject TaskService
    const queryClient = useQueryClient();


    const {mutate, isPending, isError, error} = useMutation(
        {
            mutationFn: (params: TaskDeleteParams) => {
                return taskService.deleteTask(params.taskId)
            },
            onSuccess: async (data) => {
                queryClient.invalidateQueries('tasks');
                toast.success("Task delete successful.")
            }
        });

    const handleTaskDelete = useCallback(
        (params: TaskDeleteParams) => {
            mutate(params);
        },
        [mutate]
    );

    return {
        handleTaskDelete,
        isPending,
        isError,
        error,
    };
};

export default useTaskDelete;
