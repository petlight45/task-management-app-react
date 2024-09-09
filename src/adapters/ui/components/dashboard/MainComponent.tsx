import * as React from 'react';
import MainComponentTaskForm from "./MainComponentTaskForm";
import MainComponentTaskCategory from "./MainComponentTaskCategory";
import {useDashboardContext} from "../../../../contexts/DashboardContext";
import {MenuTaskLayoutListCategory} from "../../configs/dashboard";

type MainComponentProps = {};
const MainComponent: React.FC<MainComponentProps> = (props: MainComponentProps) => {
    const {currentTaskCategoryInView} = useDashboardContext()
    return (
        <>
            <div className={"w-full px-4 py-3 space-y-6 > * + * lg:max-h-screen lg:overflow-scroll"}>
                <MainComponentTaskCategory
                    showAddButton={currentTaskCategoryInView !== MenuTaskLayoutListCategory.PAST_DUE}
                    categoryName={currentTaskCategoryInView}/>
            </div>
            <MainComponentTaskForm/>
        </>
    );
};

export default MainComponent;
