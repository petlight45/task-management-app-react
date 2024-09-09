import * as React from 'react';
import {Task} from "../../../../core/entities/Task";
import {useSelector} from "react-redux";
import {RootState} from "../../../../infrastructure/state/store";
import {User} from "../../../../core/entities/User";
import {TaskStateColorType} from "../../configs/dashboard";
import {useDashboardContext} from "../../../../contexts/DashboardContext";


type MainComponentTaskListItemProps = {
    task: Task
};
const MainComponentTaskListItem: React.FC<MainComponentTaskListItemProps> = ({task}: MainComponentTaskListItemProps) => {
    const user: User = useSelector((state: RootState) => state.user.user);
    const {currentTaskInView, setCurrentTaskInView, setIsTaskCreateEditInView} = useDashboardContext()
    const classesDynamicMainWrapper: string[] = []
    const classesDynamicStateColorBox: string[] = []
    if (task._id === currentTaskInView?._id) {
        classesDynamicMainWrapper.push("bg-secondary1")
    } else if (task?.assigneeId._id === user._id) {
        classesDynamicMainWrapper.push("bg-accent5")
    } else {
        classesDynamicMainWrapper.push("bg-primary5")
    }
    classesDynamicStateColorBox.push("bg-" + TaskStateColorType[task.state])


    return (
        <div
            key={task._id}
            onClick={() => {
                setCurrentTaskInView(task)
                setIsTaskCreateEditInView(true)
            }}
            className={"cursor-pointer rounded-lg border border-solid border-defaultBorder border-box w-full flex flex-row items-center justify-between py-2 px-3 space-x-4 > * + * hover:bg-secondary1 active:bg-secondary1 focus:bg-secondary1 transition ease-in-out duration-200 " + (classesDynamicMainWrapper.join(" "))}>
            <div className={"w-4 h-4 " + (classesDynamicStateColorBox.join(" "))}/>
            <div className={"text-base text-textColor-1 w-full"}>
                {task.name}
            </div>
            <div className={"text-textColor-1 text-xs font-bold"}>
                {(task.assigneeId?._id === user._id && ("From: @" + ((user._id === (task.ownerId?._id || task.ownerId)) ? "yourself" : task.ownerId?.username)))}
            </div>
        </div>
    )
}

export default MainComponentTaskListItem;
