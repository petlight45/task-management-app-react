import * as React from "react";
import ProceedButton from "../ProceedButton";
import {useNavigate} from "react-router";
import AppRoutesConfig from "../../../../infrastructure/routes/config";

const WelcomeComponent: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className={"text-5xl font-semibold text-textColor-4"}>
                TaskMap
            </div>
            <div className={"text-base font-semibold text-textColor-3 mt-3"}>
                With only the features you need, Organic Mind is customized for individuals seeking a
                stress-free way to stay focused on their goals, projects, and tasks.
            </div>
            <ProceedButton onClick={() => navigate(AppRoutesConfig.signUp)}>
                Get Started
            </ProceedButton>
            <div
                onClick={() => navigate(AppRoutesConfig.login)}
                className={"text-base text-center mt-3 font-semibold text-textColor-3 p-1 mt-4 hover:bg-secondary1 active:bg-secondary1 focus:bg-secondary1 cursor-pointer transition ease-in-out duration-200"}>
                Already have an account? Sign in
            </div>
        </>
    );
};

export default WelcomeComponent;