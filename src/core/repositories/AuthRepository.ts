import {User} from '../entities/User';
import LocalStorage from "../../adapters/storage/localStorage";
import {Task} from "../entities/Task";

type AuthRepositoryParams = {
    authApi: any
}
export default class AuthRepository {
    private readonly authApi;

    constructor(params: AuthRepositoryParams) {
        this.authApi = params.authApi
    }

    async login(email: string, password: string): Promise<User> {
        const data: any = await this.authApi.login(email, password);
        // Store access and refresh tokens in localStorage
        LocalStorage.setItem('accessToken', data.access);
        LocalStorage.setItem('refreshToken', data.refresh);
    }

    async register(username: string, email: string, password: string): Promise<User> {
        return await this.authApi.register(username, email, password);
    }

    async getProfile(): Promise<User> {
        return await this.authApi.getProfile();
    }

    async updateProfile(updatedUser: Partial<User>): Promise<User> {
        return await this.authApi.updateProfile(updatedUser);
    }

    async refreshAccessToken(): Promise<string> {
        const refreshToken = LocalStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token found');
        const data = await this.authApi.refreshAccessToken(refreshToken as string);
        // Update access token in localStorage
        const newAccessToken = data.access;
        LocalStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    }

    async logout(): Promise<void> {
        LocalStorage.removeItem('accessToken');
        LocalStorage.removeItem('refreshToken');
    }

    async fetchUsers(queryParams: { [key: string]: any }): Promise<Task[]> {
        return await this.authApi.fetchUsers(queryParams);
    }
}
