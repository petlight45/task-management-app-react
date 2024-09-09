import * as React from "react";
import {useState} from "react";
import AuthInputField from "./AuthInputField";
import ProceedButton from "../ProceedButton";
import AppRoutesConfig from "../../../../infrastructure/routes/config";
import {useNavigate} from "react-router";
import useLogin from "../../hooks/auth/useLogin";

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()
    const {handleLogin, isPending} = useLogin()


    return (
        <form className={"w-full"} onSubmit={(e) => {
            e.preventDefault()
            handleLogin(email, password)
        }}>
            <div className={"text-5xl font-semibold text-textColor-4"}>
                Sign In
            </div>
            <AuthInputField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={'email@example.com'}
                className={'mt-3'}
                type={'email'}/>
            <AuthInputField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={'password'}
                className={'mt-3'}
                type={'password'}/>
            <ProceedButton type={"submit"} isLoading={isPending}>
                Sign In
            </ProceedButton>
            <div
                onClick={() => navigate(AppRoutesConfig.signUp)}
                className={"text-base text-center mt-3 font-semibold text-textColor-3 p-1 mt-4 hover:bg-secondary1 active:bg-secondary1 focus:bg-secondary1 cursor-pointer transition ease-in-out duration-200"}>
                Do not have an account? Sign up
            </div>
        </form>
    );
};

export default SignInForm;