import * as React from 'react';
import SignInForm from "../../components/auth/SignInForm";
import AuthLayoutWrapper from "../../components/auth/AuthLayoutWrapper";
import MainLayoutWrapper from "../../components/MainLayoutWrapper";


const SignInScreen: React.FC = () => {
    return (
        <MainLayoutWrapper>
            <AuthLayoutWrapper>
                <SignInForm/>
            </AuthLayoutWrapper>
        </MainLayoutWrapper>
    );
};

export default SignInScreen;
