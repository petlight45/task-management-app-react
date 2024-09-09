import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../state/store';
import AppRoutesConfig from "./config";
import {useDependencies} from "../../contexts/DIContext";
import LocalStorage from "../../adapters/storage/localStorage";
import {setUser} from "../state/slices/userSlice";
import Spinner from "../../adapters/ui/components/Spinner";


interface ProtectedRouteProps {
    component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component: Component}) => {
    const isAuthenticated = useSelector((state: RootState) => !!state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const {authService} = useDependencies();
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

    useEffect(() => {
        const reauthenticate = async () => {
            const token = LocalStorage.getItem('accessToken');
            if (!isAuthenticated && token) {
                try {
                    const user = await authService.getProfile();
                    dispatch(setUser(user));
                    setIsAuthenticating(false);
                } catch (error) {
                    setIsAuthenticating(false);
                    LocalStorage.removeItem('accessToken'); // Remove invalid token
                }
            } else {
                setIsAuthenticating(false);
            }
        };
        reauthenticate();
    }, [isAuthenticated, authService, dispatch]);

    if (isAuthenticating) {
        return <div className="min-h-screen flex align-center items-center w-screen">
            <Spinner className={"w-12 h-12"}/>
        </div>
    }
    return isAuthenticated ? <Component/> : <Navigate to={AppRoutesConfig.login}/>;
};

export default ProtectedRoute;
