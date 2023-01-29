export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    creditCard: any;
    
    constructor(id: number, username: string, password: string, email: string, creditCard: any) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.creditCard = creditCard;
    }
}