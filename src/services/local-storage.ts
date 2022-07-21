export class LocalStoreService {
    user: string;
    token: string;
    static LocalStoreService: {};
    constructor() {
        this.user = 'User';
        this.token = 'Token';
    }

    getUser(): string {
        return localStorage.getItem(this.user)
            ? JSON.parse(localStorage.getItem(this.user) as string)
            : '';
    }

    setUser(user: string) {
        localStorage.setItem(this.user, JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem(this.user);
    }

    getToken(): string {
        return localStorage.getItem(this.token)
            ? JSON.parse(localStorage.getItem(this.token) as string)
            : '';
    }

    setToken(token: string) {
        localStorage.setItem(this.token, JSON.stringify(token));
    }

    removeToken() {
        localStorage.removeItem(this.token);
    }
}
