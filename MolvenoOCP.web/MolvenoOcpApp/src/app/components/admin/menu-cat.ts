import { Ingredient } from '../../models/ingredient';
import { Allergy } from '../../models/allergy';
import { Menucategory } from '../../models/menucategory.enum';
import { Subdish } from '../../models/subdish';
import { Seasons } from '../../models/seasons';

export interface MenuItemsInterface {
    id: number;
    name: string;
    season: Seasons;
    salesPrice: number;
    menuCategory: Menucategory;
    amountOfTimesOrdered: number;
    ingredientList: IngredientsInterface[];
    subDishList: SubdishesInterface[];
    profit; number;
    filteredListOfAllergiesPerMenuItem: ListOfAllergiesPMI[];
    calculatedPrice: number;
    vegetarian: boolean;
    ingredientsInStock: boolean;
}

    export interface IngredientsInterface {
        allergy: string;
        id: number;
        inStock: boolean;
        name: string;
        price: number;
        stock: number;
        vegetarian: boolean;
    }

    export interface SubdishesInterface {
        id: number;
        ingredientListForSubDish: SubdishesIngredientInterface[];
        name: string;
        vegetarian: boolean;
    }

        export interface SubdishesIngredientInterface {
            allergy: string;
            id: number;
            inStock: boolean;
            name: string;
            price: number;
            stock: number;
            vegetarian: boolean;
        }


    export interface ListOfAllergiesPMI {
        id: number;
    }
