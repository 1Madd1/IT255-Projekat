export class ComponentItem {
    id: number;
    name: string;
    description: string;
    manufacturer: string;
    quantity: number;
    image: string;
    price: number;
    
    constructor(id: number, name: string, image: string, description: string, manufacturer: string, quantity: number, price: number) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.manufacturer = manufacturer;
        this.quantity = quantity;
        this.price = price;
    }
}