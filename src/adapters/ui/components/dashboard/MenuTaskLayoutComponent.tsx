import * as React from 'react';
import useTasksSelectFromCategory from "../../hooks/dashboard/useTasksSelectFromCategory";
import {useDashboardContext} from "../../../../contexts/DashboardContext";

type MenuTaskLayoutComponentProps = {
    taskCategories: any[];
};
const MenuTaskLayoutComponent: React.FC<MenuTaskLayoutComponentProps> = (props: MenuTaskLayoutComponentProps) => {
    const {currentTaskCategoryInView, setCurrentTaskCategoryInView} = useDashboardContext()
    return (
        <div className={"grow"}>
            <div className={"text-xs font-semibold text-textColor-3 mb-1"}>
                TASKS
            </div>
            {props.taskCategories.map((item) => {
                const tasks: any[] = useTasksSelectFromCategory(item.name)
                const isActive: boolean = item.name === currentTaskCategoryInView
                return (
                    <div
                        key={item.name}
                        onClick={() => setCurrentTaskCategoryInView(item.name)}
                        className={"flex flex-row justify-between py-1 items-center space-x-3 > * + * hover:bg-secondary1 active:bg-secondary1 focus:bg-secondary1 cursor-pointer transition ease-in-out duration-200 " + (isActive ? "bg-secondary1" : "")}>
                        <img src={item.icon} className={"w-4 h-4"}/>
                        <div className={"text-textColor-3 text-base w-full"}>
                            {item.name}
                        </div>
                        <div
                            className={"bg-primary4 w-8 h-6 text-xs flex justify-center items-center border-box border-0 font-semibold rounded"}>
                            {tasks.length}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default MenuTaskLayoutComponent;
