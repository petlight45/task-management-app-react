import * as React from 'react';
import SignUpForm from "../../components/auth/SignUpForm";
import MainLayoutWrapper from "../../components/MainLayoutWrapper";
import AuthLayoutWrapper from "../../components/auth/AuthLayoutWrapper";


const SignUpScreen: React.FC = () => {
    return (
        <MainLayoutWrapper>
            <AuthLayoutWrapper>
                <SignUpForm/>
            </AuthLayoutWrapper>
        </MainLayoutWrapper>
    );
};

export default SignUpScreen;
