import React, {createContext, useContext} from 'react';
import {MenuTaskLayoutListCategory} from "../adapters/ui/configs/dashboard";
import {Task} from "../core/entities/Task";

interface DashboardContextParams {
    currentTaskInView?: Task,
    isSideMenuBarInView: boolean,
    isTaskCreateEditInView: boolean,
    currentTaskCategoryInView: MenuTaskLayoutListCategory,
    setCurrentTaskInView: (value: Task) => void,
    setIsSideMenuBarInView: (value: boolean) => void,
    setIsTaskCreateEditInView: (value: boolean) => void,
    setCurrentTaskCategoryInView: (value: MenuTaskLayoutListCategory) => void
}

interface DashboardContextProviderParams {
    value: DashboardContextParams,
    children: React.ReactNode
}

const DashboardContext = createContext<DashboardContextParams>({
    isSideMenuBarInView: false,
    isTaskCreateEditInView: false,
    currentTaskCategoryInView: MenuTaskLayoutListCategory.TODAY,
    setCurrentTaskInView: () => null,
    setIsSideMenuBarInView: () => null,
    setIsTaskCreateEditInView: () => null,
    setCurrentTaskCategoryInView: () => null
});


export const useDashboardContext = () => useContext<DashboardContextParams>(DashboardContext)


export const DashboardContextProvider: React.FC = (params: DashboardContextProviderParams) => {
    return <DashboardContext.Provider value={params.value}>{params.children}</DashboardContext.Provider>;
};
