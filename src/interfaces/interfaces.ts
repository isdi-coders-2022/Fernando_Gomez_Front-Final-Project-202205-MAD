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
    rooms: iRoom[];
}

export interface iRoom{
    _id?: string;
    name?: string;
    users: iUser[];
    messages: iMessage[];
    image?: string;
    createdAt: string;
    type: string;
}

export interface iMessage{
    _id?: string;
    sender: string;
    recipient: string;
    content: string;
    createdAt?: string;
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