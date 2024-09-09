import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task} from "../../../core/entities/Task";

interface TaskState {
    tasks: Task[];
    tasksToday: Task[];
    tasksTomorrow: Task[];
    tasksAfterTomorrow: Task[];
    tasksPastDue: Task[];
}

const initialState: TaskState = {
    tasks: [],
    tasksToday: [],
    tasksTomorrow: [],
    tasksAfterTomorrow: [],
    tasksPastDue: [],
};

const sortTasksByDueDate = (tasks: Task[]) => {
    return tasks.sort((a, b) => new Date(a.dueDate as string) - new Date(b.dueDate as string));
};

const reUpdateTasksGroup = (state) => {
    const tasksToday = [];
    const tasksTomorrow = [];
    const tasksAfterTomorrow = [];
    const tasksPastDue = [];

    // Get today's date and set time to midnight for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get tomorrow's date and set time to midnight
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Get the day after tomorrow
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    // Loop through each task
    state.tasks.forEach((task) => {
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate as string);
            if (dueDate < today) {
                tasksPastDue.push(task);
            } else if (dueDate >= today && dueDate < tomorrow) {
                tasksToday.push(task);
            } else if (dueDate >= tomorrow && dueDate < dayAfterTomorrow) {
                tasksTomorrow.push(task);
            } else {
                tasksAfterTomorrow.push(task);
            }
        }
    });
    state.tasksToday = sortTasksByDueDate(tasksToday);
    state.tasksTomorrow = sortTasksByDueDate(tasksTomorrow);
    state.tasksAfterTomorrow = sortTasksByDueDate(tasksAfterTomorrow);
    state.tasksPastDue = sortTasksByDueDate(tasksPastDue);
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload as [];
            reUpdateTasksGroup(state)
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
            reUpdateTasksGroup(state)
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            state.tasks[index] = action.payload;
            reUpdateTasksGroup(state)
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
            reUpdateTasksGroup(state)
        },
    },
});

export const {setTasks, addTask, updateTask, deleteTask} = taskSlice.actions;

export default taskSlice.reducer;
