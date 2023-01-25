export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    onlineWallet: number;
    
    constructor(id: number, username: string, password: string, email: string, onlineWallet: number) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.onlineWallet = onlineWallet;
    }
}