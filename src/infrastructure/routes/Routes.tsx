import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import DashboardScreen from "../../adapters/ui/screens/DashboardScreen";
import SignUpScreen from "../../adapters/ui/screens/auth/SignUpScreen";
import SignInScreen from "../../adapters/ui/screens/auth/SignInScreen";
import WelcomeScreen from "../../adapters/ui/screens/auth/WelcomeScreen";
import ProtectedRoute from "./ProtectedRoute";
import AppRoutesConfig from "./config"; // For authenticated routes

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={AppRoutesConfig.home} element={<WelcomeScreen/>}/>
                <Route path={AppRoutesConfig.login} element={<SignInScreen/>}/>
                <Route path={AppRoutesConfig.signUp} element={<SignUpScreen/>}/>
                {/* Protected route for authenticated users */}
                <Route path={AppRoutesConfig.dashboard} element={<ProtectedRoute component={DashboardScreen}/>}/>
                <Route path="*" element={<Navigate to={AppRoutesConfig.home}/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
