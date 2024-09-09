import * as React from 'react';
import {User} from "../../../../core/entities/User";
import {useSelector} from "react-redux";
import {RootState} from "../../../../infrastructure/state/store";

type MainComponentHeaderTaskHeaderProps = {
    taskCategoryName: string,
    taskCount: number
};
const MainComponentHeaderTaskHeader: React.FC<MainComponentHeaderTaskHeaderProps> = (props: MainComponentHeaderTaskHeaderProps) => {
    const user: User = useSelector((state: RootState) => state.user.user);
    return (

        <div className={"ml-6 flex flex-row justify-between items-center w-full"}>
            <div className="flex flex-row space-x-5 > * + * items-center ">
                <div className={"text-textColor-4 font-semibold text-4xl "}>
                    {props.taskCategoryName}
                </div>
                <div
                    className={"text-textColor-4 px-2 bg-primary5 rounded-lg border-box border border-solid border-defaultBorder outline-none text-4xl "}>
                    {props.taskCount}
                </div>
            </div>
            <div
                className={"text-textColor-4 px-2 bg-primary5 rounded-lg border-box border border-solid border-defaultBorder outline-none text-base mr-6"}>
                @{user?.username}
            </div>
        </div>
    );
};

export default MainComponentHeaderTaskHeader;
