import {User} from '../entities/User';

type AuthServiceParams = {
    authRepository: any
}

export default class AuthService {
    private readonly authRepository;

    constructor(params: AuthServiceParams) {
        this.authRepository = params.authRepository
    }

    async login(email: string, password: string): Promise<User> {
        return this.authRepository.login(email, password);
    }

    async register(name: string, email: string, password: string): Promise<User> {
        return this.authRepository.register(name, email, password);
    }

    async getProfile(): Promise<User> {
        return this.authRepository.getProfile();
    }

    async updateProfile(updatedUser: Partial<User>): Promise<User> {
        return this.authRepository.updateProfile(updatedUser);
    }

    async refreshAccessToken(): Promise<string> {
        return this.authRepository.refreshAccessToken();
    }

    async logout(): Promise<void> {
        return this.authRepository.logout();
    }

    async fetchUsers(queryParams: { [key: string]: any }) {
        return this.authRepository.fetchUsers(queryParams);
    }
}
