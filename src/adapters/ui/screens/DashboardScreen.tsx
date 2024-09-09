import * as React from 'react';
import {useState} from 'react';
import MainLayoutWrapper from "../components/MainLayoutWrapper";
import DashboardLayoutComponent from "../components/dashboard/DashboardLayoutComponent";
import {DashboardContextProvider} from "../../../contexts/DashboardContext";
import {MenuTaskLayoutListCategory} from "../configs/dashboard";
import useTasksFetch from "../hooks/dashboard/useTasksFetch";
import Spinner from "../components/Spinner";
import {useSelector} from "react-redux";
import {RootState} from "../../../infrastructure/state/store";
import useAllUsersFetch from "../hooks/dashboard/useAllUsersFetch";
import {useSocketEvents} from "../../socket/socketService";


const DashboardScreen: React.FC = () => {
    const [currentTaskInView, setCurrentTaskInView] = useState<string | null>()
    const [isSideMenuBarInView, setIsSideMenuBarInView] = useState<boolean>(false)
    const [isTaskCreateEditInView, setIsTaskCreateEditInView] = useState<boolean>(false)
    const [currentTaskCategoryInView, setCurrentTaskCategoryInView] = useState<MenuTaskLayoutListCategory>(MenuTaskLayoutListCategory.TODAY)
    const {isLoading} = useTasksFetch()
    useAllUsersFetch()
    useSocketEvents()
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    return (
        <DashboardContextProvider value={
            {
                currentTaskInView,
                isSideMenuBarInView,
                isTaskCreateEditInView,
                currentTaskCategoryInView,
                setCurrentTaskInView,
                setIsSideMenuBarInView,
                setIsTaskCreateEditInView,
                setCurrentTaskCategoryInView,
            }
        }>
            <MainLayoutWrapper>
                {(isLoading && !tasks) ?
                    <div className="min-h-screen flex align-center items-center w-screen">
                        <Spinner className={"w-12 h-12"}/>
                    </div> :
                    <DashboardLayoutComponent/>}
            </MainLayoutWrapper>
        </DashboardContextProvider>
    );
};

export default DashboardScreen;
