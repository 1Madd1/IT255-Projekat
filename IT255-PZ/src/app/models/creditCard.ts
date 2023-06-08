export class CreditCard {
    id: number;
    userId: number;
    number: string;
    date: string;
    cvv2: string;
    money: number;
    
    constructor(id: number, userId: number, number: string, date: string, cvv2: string, money: number) {
        this.id = id;
        this.userId = userId;
        this.number = number;
        this.date = date;
        this.cvv2 = cvv2;
        this.money = money;
    }
}

export class CreditCardDTO {
    userId: number
    number: string
    date: string
    cvv2: string
    money: number
}

export class UpdateCreditCardDTO {
    id: number
    user: any
    cardNumber: string
    cardDate: string
    cvv2: string
    money: number
}