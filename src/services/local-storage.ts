import { iUser } from '../interfaces/interfaces.js';

export class UserStore {
    store: string;
    constructor() {
        this.store = 'User';
    }

    getUser(): iUser {
        return localStorage.getItem(this.store)
            ? JSON.parse(localStorage.getItem(this.store) as string)
            : '';
    }

    setUser(user: iUser) {
        localStorage.setItem(this.store, JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem(this.store);
    }
}