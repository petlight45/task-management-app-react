import {User} from "../../core/entities/User";

type AuthApiParams = {
    apiClient: any
}

export default class AuthApi {
    private readonly apiClient;

    constructor(params: AuthApiParams) {
        this.apiClient = params.apiClient
    }

    async login(email: string, password: string): Promise<User> {
        const response = await this.apiClient.post('/user/login', {email, password});
        return response.data;
    }

    async register(username: string, email: string, password: string): Promise<User> {
        const response = await this.apiClient.post('/user/register', {username, email, password});
        return response.data;
    }

    async getProfile(): Promise<User> {
        const response = await this.apiClient.get('/user/me');
        return response.data;
    }

    async updateProfile(user: Partial<User>): Promise<User> {
        const response = await this.apiClient.patch('/user/me', user);
        return response.data;
    }

    async refreshAccessToken(refreshToken: string): Promise<{ access: string }> {
        const response = await this.apiClient.post('/user/token/refresh/', {refresh_token: refreshToken});
        return response.data;
    }

    async fetchUsers(queryParams: { [key: string]: any }): Promise<User[]> {
        const response = await this.apiClient.get<User[]>('/user/all/', {
            params: queryParams
        });
        return response.data;
    }
}
