import * as React from 'react';

type MainLayoutWrapperProps = {
    children: React.ReactNode;
};

const MainLayoutWrapper: React.FC<MainLayoutWrapperProps> = ({children}) => {
    return (
        <div className={'w-screen min-h-screen flex flex-row justify-stretch items-stretch lg:space-x-3 > * + *'}>
            {children}
        </div>
    );
};

export default MainLayoutWrapper;
