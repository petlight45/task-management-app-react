import {asClass, asValue, AwilixContainer, createContainer} from 'awilix';
import TaskService from "../core/services/TaskService";
import TaskApi from "../adapters/http/TaskApi";
import TaskRepository from "../core/repositories/TaskRepository";
import AuthApi from "../adapters/http/AuthApi";
import APIClient from "../adapters/http/axiosInstance";
import AuthRepository from "../core/repositories/AuthRepository";
import AuthService from "../core/services/AuthService";
import {AxiosInstance} from "axios";


type ContainerDependencies = {
    apiClient: AxiosInstance | null,
    authApi: AuthApi,
    authRepository: AuthRepository,
    authService: AuthService,
    taskService: TaskService,
    taskApi: TaskApi,
    taskRepository: TaskRepository,
}

const container: AwilixContainer<ContainerDependencies> = createContainer<ContainerDependencies>();

container.register({
    authApi: asClass(AuthApi).singleton(),
    authRepository: asClass(AuthRepository).singleton(),
    authService: asClass(AuthService).singleton(),
    taskService: asClass(TaskService).singleton(),
    taskApi: asClass(TaskApi).singleton(),
    taskRepository: asClass(TaskRepository).singleton(),
    apiClient: asValue(APIClient())
});
export default container;
