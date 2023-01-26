export class Computer {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    
    constructor(id: number, name: string, image: string, description: string, price: number) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
    }
}