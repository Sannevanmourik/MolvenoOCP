export class Ingredient {

    id: number;
    name: string;
    price: number;
    vegetarian: boolean;
    stock: number;
    inStock: boolean;
    allergy: string; // is an enum in backend
}
