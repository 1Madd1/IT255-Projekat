export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    enabled: boolean;
    creditCard: any;
    
    constructor(id: number, username: string, password: string, email: string, creditCard: any) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.creditCard = creditCard;
    }
}

export class LoginUserDTO {
    username: string
    password: string
  }

export class RegisterUserDTO {
    username: string
    email: string
    password: string
}

export class UserDTO {
    id: number;
    username: String;
    password: String;
    email: String;
    role: String;
    enabled: boolean;

    constructor(id: number, username: String, password: String, email: String, role: String, enabled: boolean) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.enabled = enabled;
    }
}