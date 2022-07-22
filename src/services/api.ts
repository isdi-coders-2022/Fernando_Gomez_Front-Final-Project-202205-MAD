import { iUser } from '../interfaces/interfaces';

export class ApiChat {
    apiUrl: string;
    constructor() {
        this.apiUrl = 'http://localhost:4000/';
    }

    async signup(payload: any): Promise<any> {
        const resp = await fetch(`${this.apiUrl}user`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await resp.json();
    }

    async login(payload: any): Promise<any> {
        const resp = await fetch(`${this.apiUrl}user/login`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await resp.json();
    }

    async getAllRoomsByUser(id: string, token: string): Promise<any> {
        const url = `${this.apiUrl}room/user/${id}`;
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await resp.json();
    }

    async getUserbyId(id: string, token: string): Promise<iUser> {
        const url = `${this.apiUrl}user/${id}`;
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await resp.json();
    }

    async getAllUsers(id: string, token: string): Promise<iUser[]> {
        const url = `${this.apiUrl}user`;
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await resp.json();
    }

    async updateUser(
        id: iUser['_id'],
        token: string,
        payload: iUser
    ): Promise<iUser> {
        const resp = await fetch(`${this.apiUrl}user/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await resp.json();
    }

    async deleteAccountUser(id: iUser['_id'], token: string): Promise<iUser> {
        const resp = await fetch(`${this.apiUrl}user/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await resp.json();
    }
}
