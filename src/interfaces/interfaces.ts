export interface iUser{
    _id?: string;
    email: string;
    password: string;
    token?: string;
    name: string;
    surname: string;
    nickname: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    online?: boolean;
    onConversation?: string; 
    rooms?: iRoom[];
}

export interface iRoom{
    _id?: string;
    owner: string;
    name?: string;
    users: string[];
    messages: iMessage[];
    image?: string;
    createdAt?: string;
    type?: string;
}

export interface iMessage{
    _id?: string;
    sender: string;
    recipient: string;
    content: string;
    createdAt?: string;
    seen?: boolean;
}
export interface iStore{
    user: iUser[];
    users: iUser[];
    rooms: iRoom[];
    groupRoom: string[];
}

export interface iRouterItem {
    path: string;
    label: string;
    page: JSX.Element;
}