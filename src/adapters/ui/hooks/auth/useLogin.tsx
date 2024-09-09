import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {toast} from 'react-toastify';
import {useDependencies} from "../../../../contexts/DIContext";
import {AppDispatch} from "../../../../infrastructure/state/store";
import {setUser} from "../../../../infrastructure/state/slices/userSlice";
import AppRoutesConfig from "../../../../infrastructure/routes/config";


const useLogin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {authService} = useDependencies(); // Inject TaskService


    const {mutate, isPending, isError, error} = useMutation(
        {
            mutationFn: ({email, password}: { email: string; password: string }) => authService.login(email, password),
            onSuccess: async (data) => {
                dispatch(setUser(await authService.getProfile()));
                navigate(AppRoutesConfig.dashboard);
                toast.success("Login successful.")
            }
        });

    const handleLogin = useCallback(
        (email: string, password: string) => {
            mutate({email, password});
        },
        [mutate]
    );

    return {
        handleLogin,
        isPending,
        isError,
        error,
    };
};

export default useLogin;
