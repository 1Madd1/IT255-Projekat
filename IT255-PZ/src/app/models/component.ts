export class Component {
    id: number;
    name: string;
    description: string;
    manufacturer: string;
    quantity: number;
    price: number;
    
    constructor(id: number, name: string, description: string, manufacturer: string, quantity: number, price: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.manufacturer = manufacturer;
        this.quantity = quantity;
        this.price = price;
    }
}