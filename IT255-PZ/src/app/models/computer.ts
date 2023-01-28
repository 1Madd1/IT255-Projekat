export class Computer {
    id: number;
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
    
    constructor(id: number, name: string, image: string, description: string, quantity: number, price: number) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
    }
}