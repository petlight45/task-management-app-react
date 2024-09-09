import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useCallback} from 'react';
import {toast} from 'react-toastify';
import {useDependencies} from "../../../../contexts/DIContext";
import AppRoutesConfig from "../../../../infrastructure/routes/config";


const useSignup = () => {
    const navigate = useNavigate();
    const {authService} = useDependencies(); // Inject TaskService


    const {mutate, isPending, isError, error} = useMutation(
        {
            mutationFn: ({username, email, password}: { username: string, email: string; password: string }) => authService.register(username, email, password),
            onSuccess: async (data) => {
                toast.success("Signup successful. Kindly login to your account.")
                navigate(AppRoutesConfig.login);
            }
        });

    const handleSignup = useCallback(
        (username: string, email: string, password: string) => {
            mutate({username, email, password});
        },
        [mutate]
    );

    return {
        handleSignup,
        isPending,
        isError,
        error,
    };
};

export default useSignup;
