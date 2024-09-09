import React from 'react';

type SpinnerProps = {
    [key: string]: any
};

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
    return (
        <div
            className={"w-full flex justify-center items-center mt-4" + (props?.className ? ` ${props.className}` : '')}>
            <div
                className={"w-6 h-6 border-4 border-t-4 border-secondary1 border-t-accent1 border-solid rounded-full animate-spin"}></div>
        </div>

    );
};

export default Spinner;