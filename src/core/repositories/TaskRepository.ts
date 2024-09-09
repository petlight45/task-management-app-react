import {Task} from "../entities/Task";

type TaskRepositoryParams = {
    taskApi: any
}
export default class TaskRepository {
    private readonly taskApi;

    constructor(params: TaskRepositoryParams) {
        this.taskApi = params.taskApi
    }

    async create(task: Partial<Task>): Promise<Task> {
        return await this.taskApi.createTask(task);
    }

    async update(taskId: string, task: Partial<Task>): Promise<Task> {
        return await this.taskApi.updateTask(taskId, task);
    }

    async updateTaskState(taskId: string, state: string): Promise<Task> {
        return await this.taskApi.updateTaskState(taskId, state);
    }

    async delete(taskId: string): Promise<void> {
        return await this.taskApi.deleteTask(taskId);
    }

    async fetchTask(taskId: string, queryParams: { [key: string]: any }): Promise<Task> {
        return await this.taskApi.fetchTask(taskId, queryParams);
    }

    async fetchTasks(queryParams: { [key: string]: any }): Promise<Task[]> {
        return await this.taskApi.fetchTasks(queryParams);
    }
}
