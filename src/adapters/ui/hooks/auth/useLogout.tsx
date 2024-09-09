import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useDependencies} from "../../../../contexts/DIContext";
import {AppDispatch} from "../../../../infrastructure/state/store";
import {logoutUser} from "../../../../infrastructure/state/slices/userSlice";
import AppRoutesConfig from "../../../../infrastructure/routes/config";
import {useCallback} from "react";


const useLogout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {authService} = useDependencies(); // Inject TaskService
    const {mutate, isPending, isError, error} = useMutation(
        {
            mutationFn: async () => authService.logout(),
            onSuccess: async (data) => {
                dispatch(logoutUser())
                toast.success("Logout successful.")
                navigate(AppRoutesConfig.login)
            }
        });

    const handleLogout = useCallback(() => {
        mutate()
    }, [mutate])

    return {
        handleLogout,
        isPending,
        isError,
        error,
    };
};

export default useLogout;
