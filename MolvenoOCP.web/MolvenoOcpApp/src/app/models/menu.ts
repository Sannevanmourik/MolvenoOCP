export class Menu {
    id: number;
    name: string;
    salesPrice: number;
    menuCategory: string[];
    amountOfTimesOrdered: number;
    ingredientList: string[];
    subDishList: string[];
    profit: number;
    filteredListOfAllergiesPerMenuItem: string[];
    calculatedPrice: number;
    vegetarian;
    ingredientsInStock: number;
}
