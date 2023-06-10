import { ComponentItem } from "./component";
import { Computer } from "./computer";

export class PurchaseHistory {
    id: number;
    userId: number;
    component: ComponentItem;
    computer: Computer;
    quantity: number;
    totalPrice: number;
    purchaseDate: String;
    
    constructor(id: number, userId: number, componentId: ComponentItem, computerId: Computer, quantity: number, totalPrice: number, purchaseDate: String) {
        this.id = id;
        this.userId = userId;
        this.component = componentId;
        this.computer = computerId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.purchaseDate = purchaseDate;
    }
}

export class PurchaseHistoryDTO {
    userId: number
    componentId: number
    computerId: number
    quantity: number
    totalPrice: number
    purchaseDate: String
}