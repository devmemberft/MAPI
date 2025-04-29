export declare class User {
    user_id: string;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'mod';
    createdAt: Date;
    updateAt: Date;
    deletedAt?: Date;
}
