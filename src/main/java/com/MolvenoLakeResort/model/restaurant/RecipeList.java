package com.MolvenoLakeResort.model.restaurant;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Entity
public class RecipeList {

    @Id
    @GeneratedValue
    private long id;

    @OneToMany
    @JoinColumn(name = "recipe_id")
    private List<Recipe> recipeList = new ArrayList<>();



    // getters and setters

    public long getId() {
        return id;
    }

    public List<Recipe> getRecipeList() {
        return recipeList;
    }

    public void setRecipeList(List<Recipe> recipeList) {
        this.recipeList = recipeList;
    }

    // filter lijst van recepten op basis van isIngredientsInStock
    // haal de lengte van de lijst op
    // genereer een random number in de range vd lijst
    // selecteer een recept uit de lijst op basis van random number
    // zet dit recept als menuItem op het menu (menuCategory: DishOfTheDay, price 10)

//    public MenuItem getDishOfTheDay() {
//        double totalPrice = getOrderedItemList().stream().mapToDouble(MenuItem::getSalesPrice).sum();
//        return totalPrice;
//    }

    public long getAmountOfAvailableRecipes() {
        return getRecipeList().stream().filter(m -> m.isIngredientsInStock() == true).count();

    }

    public long generateRandomNumberInRangeAvailableRecipes() {
        long range = getAmountOfAvailableRecipes();
        long random = (long) (Math.random() * range);
        return random;
    }


    // from stackoverflow: get nth number of stream:
    // OptionalInt result = stream.skip(n-1).findFirst();

    public Recipe getDishOfTheDay() {
        long n = generateRandomNumberInRangeAvailableRecipes();
        return getRecipeList().stream().skip(n-1).findFirst().get();

    }
}
