import React from 'react';
import Spinner from "./Spinner";

type ProceedButtonProps = {
    [key: string]: any,
    children: React.ReactNode;
};

const ProceedButton: React.FC<ProceedButtonProps> = (props: ProceedButtonProps) => {
    return (
        props.isLoading ?
            (<Spinner {...props}/>) : (
                <button
                    {...props}
                    className={"text-center mt-4 w-full p-1 text-textColor-2 rounded-lg bg-accent1 box-border text-base font-semibold outline-none cursor-pointer" + (props?.className ? ` ${props.className}` : '')}>
                    {props.children}
                </button>
            )

    );
};

export default ProceedButton;