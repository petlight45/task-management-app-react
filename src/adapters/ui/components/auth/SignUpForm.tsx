import * as React from "react";
import {useState} from "react";
import AuthInputField from "./AuthInputField";
import ProceedButton from "../ProceedButton";
import AppRoutesConfig from "../../../../infrastructure/routes/config";
import {useNavigate} from "react-router";
import useSignup from "../../hooks/auth/useSignup";

const SignUpForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()
    const {handleSignup, isPending} = useSignup()

    return (
        <form className={"w-full"} onSubmit={(e) => {
            e.preventDefault()
            handleSignup(username, email, password)
        }}>
            <div className={"text-5xl font-semibold text-textColor-4"}>
                Register
            </div>
            <AuthInputField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={'John'}
                className={'mt-3'}
                type={'text'}/>
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
                Sign Up
            </ProceedButton>
            <div
                onClick={() => navigate(AppRoutesConfig.login)}
                className={"text-base text-center mt-3 font-semibold text-textColor-3 p-1 mt-4 hover:bg-secondary1 active:bg-secondary1 focus:bg-secondary1 cursor-pointer transition ease-in-out duration-200"}>
                Already have an account? Sign in
            </div>
        </form>
    );
};

export default SignUpForm;