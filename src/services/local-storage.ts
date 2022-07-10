import { iRoom, iUser } from '../interfaces/interfaces';

export class LocalStoreService {
    users: string;
    rooms: string;
    constructor() {
        this.users = 'Users';
        this.rooms = 'Rooms';
    }

    getUsers(): iUser[] {
        return localStorage.getItem(this.users)
            ? JSON.parse(localStorage.getItem(this.users) as string)
            : '';
    }

    setUsers(users: iUser[]) {
        localStorage.setItem(this.users, JSON.stringify(users));
    }

    removeUser() {
        localStorage.removeItem(this.users);
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
