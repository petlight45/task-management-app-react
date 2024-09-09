import * as React from 'react';
import {Task} from "../../../../core/entities/Task";
import MainComponentTaskListItem from "./MainComponentTaskListItem";

interface MainComponentTaskListComponentProps {
    tasks: Task[]
}

const MainComponentTaskListComponent: React.FC<MainComponentTaskListComponentProps> = (props: MainComponentTaskListComponentProps) => {
    return (
        <div className={"mt-3 space-y-1 > * + * "}>
            {props.tasks.map(item => <MainComponentTaskListItem task={item} key={item._id}/>)}
        </div>
    );
};

export default MainComponentTaskListComponent;
