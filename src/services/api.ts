export class ApiChat {
    apiUrl: string;
    constructor(){
        this.apiUrl = 'http://localhost:4000/'
    }

    async signup(payload: any): Promise<any> {
        const resp = await fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await resp.json();
    }

    async login(payload: any): Promise<any> {
        const url = `${this.apiUrl}user/login`
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await resp.json();
    }

    async getAllRoomsByUser(id: string, token: string): Promise<any> {
        const url = `${this.apiUrl}room/user/${id}`;
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await resp.json();
    }
}