import { iRoom, iUser } from '../interfaces/interfaces';

export class UserStore {
    user: string;
    rooms: string;
    constructor() {
        this.user = 'User';
        this.rooms = 'Rooms';
    }

    getUser(): iUser {
        return localStorage.getItem(this.user)
            ? JSON.parse(localStorage.getItem(this.user) as string)
            : '';
    }

    setUser(user: iUser) {
        localStorage.setItem(this.user, JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem(this.user);
    }

    getRooms(): iRoom[] {
        return localStorage.getItem(this.rooms)
            ? JSON.parse(localStorage.getItem(this.rooms) as string)
            : '';
    }

    setRooms(rooms: iRoom[]) {
        localStorage.setItem(this.rooms, JSON.stringify(rooms));
    }

    removeRooms() {
        localStorage.removeItem(this.rooms);
    }
}