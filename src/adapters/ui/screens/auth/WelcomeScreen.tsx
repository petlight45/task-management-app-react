import * as React from 'react';
import WelcomeComponent from "../../components/auth/WelcomeComponent";
import MainLayoutWrapper from "../../components/MainLayoutWrapper";
import AuthLayoutWrapper from "../../components/auth/AuthLayoutWrapper";


const WelcomeScreen: React.FC = () => {
    return (
        <MainLayoutWrapper>
            <AuthLayoutWrapper>
                <WelcomeComponent/>
            </AuthLayoutWrapper>
        </MainLayoutWrapper>
    );
};

export default WelcomeScreen;
