import * as React from 'react';
import sideImg from "../../assets/images/auth/side_image.png";

type AuthLayoutWrapperProps = {
    children: React.ReactNode;
};

const AuthLayoutWrapper: React.FC<AuthLayoutWrapperProps> = ({children}) => {
    return (
        <>
            <div className={"bg-primary3 w-full hidden lg:flex justify-center items-center"}>
                <img src={sideImg} className="w-6/12 h-4/6 object-contain"/>
            </div>
            <div
                className={"bg-primary1 w-full border border-solid border-defaultBorder p-3 px-5 flex flex-col items-center"}>
                <div className={"mt-20 max-w-sm w-full"}>
                    <div className={"flex justify-center items-center mb-10 lg:hidden"}>
                        <img src={sideImg} className="w-52 h-36 object-contain"/>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default AuthLayoutWrapper;
