import {Task, TaskStateEnum} from "../../core/entities/Task";

type TaskApiParams = {
    apiClient: any
}

export default class TaskApi {
    private apiClient;

    constructor(params: TaskApiParams) {
        this.apiClient = params.apiClient;
    }

    async fetchTasks(queryParams: { [key: string]: any }) {
        const response = await this.apiClient.get<Task[]>('/task', {
            params: queryParams
        });
        return response.data;
    }

    async fetchTask(taskId: string, queryParams: { [key: string]: any }) {
        const response = await this.apiClient.get<Task>(`/task/${taskId}`, {
            params: queryParams
        });
        return response.data;
    }

    async createTask(task: Partial<Task>) {
        const response = await this.apiClient.post<Task>('/task', task);
        return response.data;
    }

    async updateTask(taskId: string, task: Partial<Task>) {
        const response = await this.apiClient.patch<Task>(`/task/${taskId}`, task);
        return response.data;
    }

    async updateTaskState(taskId: string, state: TaskStateEnum) {
        const response = await this.apiClient.post<Task>(`/task/${taskId}/change_state`, {state});
        return response.data;
    }

    async deleteTask(taskId: string) {
        await this.apiClient.delete(`/task/${taskId}`);
    }
}
