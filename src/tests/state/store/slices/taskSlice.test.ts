import taskReducer, {addTask, deleteTask, TaskState} from "../../../../infrastructure/state/slices/taskSlice";
import MockHelperUtils from "../../../mocks/index";
import {faker} from '@faker-js/faker';

describe('Task Slice Tests', () => {
    const initialState: TaskState = {
        tasks: [],
        tasksToday: [],
        tasksTomorrow: [],
        tasksAfterTomorrow: [],
        tasksPastDue: [],
    };

    it('should handle initial state', () => {
        expect(taskReducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle adding a task', () => {
        const task = MockHelperUtils.generateMockTask({});
        const newState = taskReducer(initialState, addTask(task));
        expect(newState.tasks).toEqual([task]);
    });

    it('should handle adding a task - past due', () => {
        const task = MockHelperUtils.generateMockTask({dueDate: faker.date.past()});
        const newState = taskReducer(initialState, addTask(task));
        expect(newState.tasksPastDue).toEqual([task]);
    });


    it('should handle adding a task -  tomorrow', () => {
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 1)
        const task = MockHelperUtils.generateMockTask({dueDate: dueDate.toISOString()});
        const newState = taskReducer(initialState, addTask(task));
        expect(newState.tasksTomorrow).toEqual([task]);
    });

    it('should handle adding a task -  after tomorrow', () => {
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 5)
        const task = MockHelperUtils.generateMockTask({dueDate: dueDate.toISOString()});
        const newState = taskReducer(initialState, addTask(task));
        expect(newState.tasksAfterTomorrow).toEqual([task]);
    });

    it('should handle adding a task -  today', () => {
        const task = MockHelperUtils.generateMockTask({dueDate: new Date().toISOString()});
        const newState = taskReducer(initialState, addTask(task));
        expect(newState.tasksToday).toEqual([task]);
    });

    it('should handle removing a task', () => {
        const task1 = MockHelperUtils.generateMockTask({dueDate: faker.date.soon({days: 1})});
        const task2 = MockHelperUtils.generateMockTask({dueDate: faker.date.soon({days: 1})});
        let newState = taskReducer(initialState, addTask(task1));
        newState = taskReducer(newState, addTask(task2));
        newState = taskReducer(newState, deleteTask(task1._id));
        expect(newState.tasks).toEqual([task2]);
    });
});
