import { Seasons } from './seasons';

export class Menu {
    id: number;
    name: string;
    season: Seasons;
    salesPrice: number;
    menuCategory: string[];
    amountOfTimesOrdered: number;
    ingredientList: string[];
    subDishList: string[];
    profit: number;
    filteredListOfAllergiesPerMenuItem: string[];
    calculatedPrice: number;
    vegetarian: boolean;
    ingredientsInStock: number;
}
