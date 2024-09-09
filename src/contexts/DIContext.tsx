import React, { createContext, useContext } from 'react';
import container from "../infrastructure/container";

const DIContext = createContext(container);

export const useDependencies = () => {
    return useContext(DIContext).cradle;
};

export const DIProvider: React.FC = ({ children }) => {
    return <DIContext.Provider value={container}>{children}</DIContext.Provider>;
};
