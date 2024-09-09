import * as React from 'react';
import MenuLayoutWrapper from "./MenuLayoutWrapper";
import timesIcon from "../../assets/images/dashboard/times.svg";
import signOutImage from "../../assets/images/dashboard/sign_out.svg";
import menuBarsImage from "../../assets/images/dashboard/menu_bars.svg";

import MenuTaskLayoutComponent from "./MenuTaskLayoutComponent";
import {menuTaskLayoutListCategoryData} from "../../configs/dashboard";
import MainComponent from "./MainComponent";
import useLogout from "../../hooks/auth/useLogout";
import Spinner from "../Spinner";
import {useDashboardContext} from "../../../../contexts/DashboardContext";

const DashboardLayoutComponent: React.FC = () => {
    const {handleLogout, isPending: isLoadingSignOut} = useLogout()
    const {isSideMenuBarInView, setIsSideMenuBarInView} = useDashboardContext()
    return (
        <>
            {!isSideMenuBarInView &&
            <div className="p-2 fixed top-0 left-0 cursor-pointer" onClick={() => setIsSideMenuBarInView(true)}>
                <img className={"w-6 h-6"} src={menuBarsImage}/>

            </div>}
            {isSideMenuBarInView &&
            <div
                className={"bg-primary2 min-w-80 p-3 flex flex-col items-stretch fixed bottom-3 top-3 h-auto lg:static"}>
                <MenuLayoutWrapper>
                    <div className={"flex flex-row justify-between space-x-3 > * + * mb-16"}>
                        <div className={"text-base font-semibold text-textColor-3"}>
                            Menu
                        </div>
                        <img src={timesIcon} className={"w-5 h-5 cursor-pointer"}
                             onClick={() => setIsSideMenuBarInView(false)}/>
                    </div>
                    <MenuTaskLayoutComponent taskCategories={menuTaskLayoutListCategoryData}/>
                </MenuLayoutWrapper>
                <div
                    className={"flex flex-row mb-5 justify-between py-1 items-center space-x-3 > * + * hover:bg-secondary1 active:bg-secondary1 focus:bg-secondary1 cursor-pointer transition ease-in-out duration-200"}>
                    <img src={signOutImage} className={"w-4 h-4"}/>

                    {isLoadingSignOut ? <Spinner/> :
                        <div className={"text-textColor-3 text-base w-full"} onClick={(e) => handleLogout()}>
                            Sign Out
                        </div>}
                </div>
            </div>
            }
            <div
                className={"bg-primary1 w-full overflow-hidden lg:flex lg:flex-row lg:justify-stretch"}>
                <MainComponent/>
            </div>
        </>
    );
};

export default DashboardLayoutComponent;
