import {Task} from '../entities/Task';

type TaskServiceParams = {
    taskRepository: any
}

export default class TaskService {
    private readonly taskRepository;

    constructor(params: TaskServiceParams) {
        this.taskRepository = params.taskRepository
    }

    async createTask(task: Partial<Task>) {
        return this.taskRepository.create(task);
    }

    async updateTask(taskId: string, task: Partial<Task>) {
        return this.taskRepository.update(taskId, task);
    }

    async updateTaskState(taskId: string, state: string) {
        return this.taskRepository.updateTaskState(taskId, state);
    }

    async deleteTask(taskId: string) {
        return this.taskRepository.delete(taskId);
    }

    async fetchTask(taskId: string, queryParams: { [key: string]: any }) {
        return this.taskRepository.fetchTask(taskId, queryParams);
    }

    async fetchTasks(queryParams: { [key: string]: any }) {
        return this.taskRepository.fetchTasks(queryParams);
    }
}
