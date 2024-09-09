import * as React from 'react';

type MenuLayoutWrapperProps = {
    children: React.ReactNode,
};

const MenuLayoutWrapper: React.FC<MenuLayoutWrapperProps> = ({children}) => {
    return (
        <div className={"h-full"}>
            {children}
        </div>
    );
};

export default MenuLayoutWrapper;
