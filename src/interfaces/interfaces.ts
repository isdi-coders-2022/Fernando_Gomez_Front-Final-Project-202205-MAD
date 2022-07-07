export interface iUser{
    _id?: string;
    email: string;
    password: string;
    token?: string;
    name: string;
    surname: string;
    nickname: string;
    avatar?: string;
    createdAt: string;
    updatedAt?: string;
    online: boolean;
    onConversation?: string; 
    rooms: any[];
    messages: any[];
}

export interface iRoom{
    _id?: string;
    id?: string;
    name?: string;
    users: string[];
    messages: iMessage[];
    image?: string;
    createdAt: string;
    type: string;
}

export interface iMessage{
    _id?: string;
    id?: string;
    room: string;
    sender: string;
    recipient: string;
    content: string;
    createdAt: string;
    type: string;
}
export interface iStore{
    users: iUser[];
    rooms: iRoom[];
}

export interface iRouterItem {
    path: string;
    label: string;
    page: JSX.Element;
}