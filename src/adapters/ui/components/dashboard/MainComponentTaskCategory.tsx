import * as React from 'react';
import addIcon from "../../assets/images/dashboard/add.svg";
import MainComponentHeaderTaskHeader from "./MainComponentHeaderTaskHeader";
import {MenuTaskLayoutListCategory} from "../../configs/dashboard";
import MainComponentTaskListComponent from "./MainComponentTaskListComponent";
import useTasksSelectFromCategory from "../../hooks/dashboard/useTasksSelectFromCategory";
import {useDashboardContext} from "../../../../contexts/DashboardContext";

interface MainComponentTaskCategoryProps {
    showAddButton: boolean,
    categoryName: MenuTaskLayoutListCategory
}

const MainComponentTaskCategory: React.FC<MainComponentTaskCategoryProps> = (props: MainComponentTaskCategoryProps) => {
    const tasks = useTasksSelectFromCategory(props.categoryName)
    const {setIsTaskCreateEditInView, setCurrentTaskInView} = useDashboardContext()
    return (
        <div>
            <MainComponentHeaderTaskHeader taskCategoryName={props.categoryName} taskCount={tasks?.length}/>
            <div className="mt-10">
                {props.showAddButton &&
                <div onClick={() => {
                    setCurrentTaskInView(null)
                    setIsTaskCreateEditInView(true)
                }}
                     className={"cursor-pointer rounded-lg border border-solid border-defaultBorder border-box w-full flex flex-row items-center justify-between py-2 px-3 space-x-4 > * + * hover:bg-secondary1 active:bg-secondary1 focus:bg-secondary1 transition ease-in-out duration-200"}>
                    <img src={addIcon} className={"w-4 h-4"}/>
                    <div className={"text-base text-textColor-1 w-full"}>
                        Add New Task
                    </div>
                </div>
                }
                <MainComponentTaskListComponent tasks={tasks}/>
            </div>
        </div>
    );
};

export default MainComponentTaskCategory;
