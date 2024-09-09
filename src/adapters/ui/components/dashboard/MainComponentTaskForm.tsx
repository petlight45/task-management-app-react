import * as React from 'react';
import {useEffect, useState} from 'react';
import timesIcon from "../../assets/images/dashboard/times.svg";
import FormInputField from "../FormInputField";
import ProceedButton from "../ProceedButton";
import {useDashboardContext} from "../../../../contexts/DashboardContext";
import {TaskStateEnum} from "../../../../core/entities/Task";
import {TaskStateColorType} from "../../configs/dashboard";
import {useSelector} from "react-redux";
import {RootState} from "../../../../infrastructure/state/store";
import {User} from "../../../../core/entities/User";
import useTaskUpdate from "../../hooks/dashboard/useTaskUpdate";
import useTaskUpdateState from "../../hooks/dashboard/useTaskUpdateState";
import useTaskAdd from "../../hooks/dashboard/useTaskAdd";
import useTaskDelete from "../../hooks/dashboard/useTaskDelete";

type MainComponentTaskFormProps = {};
const MainComponentTaskForm: React.FC<MainComponentTaskFormProps> = (props: MainComponentTaskFormProps) => {
    const {isTaskCreateEditInView, setIsTaskCreateEditInView, currentTaskInView, setCurrentTaskInView} = useDashboardContext()
    const isInEditMode = (!!currentTaskInView)
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [assigneeId, setAssigneeId] = useState<string>("");
    const [state, setState] = useState<string>("");
    const allUsers: User[] = useSelector((state: RootState) => state.user.allUsers);
    const user: User = useSelector((state: RootState) => state.user.user);
    const {handleTaskUpdate, isPending: isPendingTaskUpdate} = useTaskUpdate()
    const {handleTaskUpdateState, isPending: isPendingTaskUpdateState} = useTaskUpdateState()
    const {handleTaskAdd, isPending: isPendingTaskAdd} = useTaskAdd()
    const {handleTaskDelete, isPending: isPendingTaskDelete} = useTaskDelete()


    useEffect(() => {
        setName("")
        setDescription("")
        setDueDate("")
        setAssigneeId(user._id)
        setState(TaskStateEnum.PENDING)
        if (currentTaskInView) {
            setName(currentTaskInView?.name as string)
            setDescription(currentTaskInView?.description as string)
            if (currentTaskInView?.dueDate) {
                setDueDate(new Date(currentTaskInView?.dueDate as string).toISOString().split(':').slice(0, 2).join(":"))
            }
            setAssigneeId(currentTaskInView?.assigneeId._id as string)
            setState(currentTaskInView?.state as string)
        }
    }, [currentTaskInView])
    return (
        isTaskCreateEditInView &&
        <div
            className="min-w-full bg-primary2 py-3 px-4 lg:flex flex-col fixed top-3 bottom-3 lg:min-w-[28rem] lg:static">
            <div className={"flex flex-row justify-between space-x-4 > * + *"}>
                <div className={"text-xl font-semibold text-textColor-3"}>
                    Task:
                </div>
                <img src={timesIcon} className={"w-5 h-5 cursor-pointer"}
                     onClick={() => {
                         setIsTaskCreateEditInView(false)
                         setCurrentTaskInView(null)
                     }}/>
            </div>
            <form className={"w-full grow flex flex-col items-stretch my-5"} onSubmit={(e) => {
                e.preventDefault()
                if (isInEditMode) {
                    if (user._id !== currentTaskInView?.ownerId._id) {
                        handleTaskUpdateState({
                            taskId: currentTaskInView?._id as string,
                            state
                        })
                    } else {
                        handleTaskUpdate({
                            taskId: currentTaskInView?._id as string,
                            taskPayload: {
                                name,
                                description,
                                dueDate,
                                assigneeId,
                                state
                            }
                        })
                    }
                } else {
                    handleTaskAdd({
                        taskPayload: {
                            name,
                            description,
                            dueDate,
                            assigneeId,
                            state
                        }
                    })
                }
            }}>
                <div className={"grow space-y-3 > * + *"}>
                    <FormInputField
                        value={name}
                        disabled={currentTaskInView ? user._id !== currentTaskInView?.ownerId._id : false}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={'Task name'}
                        type={'text'}
                        className={"text-textColor-1 text-base"}
                    />
                    <FormInputField
                        disabled={currentTaskInView ? user._id !== currentTaskInView?.ownerId._id : false}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={'Task description'}
                        className={"text-textColor-1 text-base"}
                        type={'textarea'} rows={8}/>
                    <div className={"flex flex-row items-center space-x-5 > * + *"}>
                        <div className={"text-sm text-textColor-3 min-w-20"}>
                            Due date
                        </div>
                        <FormInputField
                            disabled={currentTaskInView ? user._id !== currentTaskInView?.ownerId._id : false}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className={"text-textColor-1 text-base w-auto"}
                            type={'datetime-local'} min={new Date().toISOString().split('T')[0]}/>
                    </div>
                    <div className={"flex flex-row items-center space-x-5 > * + *"}>
                        <div className={"text-sm text-textColor-3 min-w-20"}>
                            Assign To
                        </div>
                        <FormInputField
                            className={"text-base w-auto"}
                            disabled={currentTaskInView ? user._id !== currentTaskInView?.ownerId._id : false}
                            value={assigneeId}
                            onChange={(e) => setAssigneeId(e.target.value)}
                            type={'select'}>
                            {allUsers.map((user) => (
                                <option value={user._id} key={user._id}>{user.username}</option>
                            ))}
                        </FormInputField>
                    </div>
                    <div className={"flex flex-row items-center space-x-5 > * + *"}>
                        <div className={"text-sm text-textColor-3 min-w-20"}>
                            State
                        </div>
                        <FormInputField
                            placeholder={'Task description'}
                            className={"text-base w-auto"}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            type={'select'}>
                            {
                                Object.values(TaskStateEnum).map((item) => (
                                    <option key={item} value={item}>{item}</option>))
                            }
                        </FormInputField>
                        {state && <div className={"w-4 h-4 " + ("bg-" + TaskStateColorType[state])}/>}
                    </div>
                </div>
                <div className={"flex flex-row mt-5 items-center space-x-6 > * + *"}>
                    {isInEditMode && (user._id === (currentTaskInView?.ownerId?._id || currentTaskInView?.ownerId)) && <ProceedButton
                        onClick={() => handleTaskDelete({taskId: currentTaskInView?._id as string})}
                        isLoading={isPendingTaskDelete}
                        className={"bg-primary5 border border-box border-solid hover:bg-secondary1 active:bg-secondary1 focus:bg-secondary1 cursor-pointer transition ease-in-out duration-200"}>
                        Delete Task
                    </ProceedButton>}
                    <ProceedButton
                        isLoading={isPendingTaskAdd || isPendingTaskUpdate || isPendingTaskUpdateState}
                        type={"submit"}>
                        {isInEditMode ? "Save Changes" : "Proceed"}
                    </ProceedButton>
                </div>
            </form>
        </div>
    );
};

export default MainComponentTaskForm;
