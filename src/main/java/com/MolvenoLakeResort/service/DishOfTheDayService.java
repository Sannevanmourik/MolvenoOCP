package com.MolvenoLakeResort.service;

import com.MolvenoLakeResort.model.restaurant.Recipe;

import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

public class DishOfTheDayService {
    // filter lijst van menuItems op basis van isIngredientsInStock
    // haal de lengte van de lijst op
    // genereer een random number in de range vd lijst
    // selecteer een menuItem uit de lijst op basis van random number
    // zet dit als menuItem op het menu (menuCategory: DishOfTheDay, price 10)


    @OneToMany
    @JoinColumn(name = "recipe_id")
    private List<Recipe> recipeList = new ArrayList<>();

    public List<Recipe> getRecipeList() {
        return recipeList;
    }

    public long generateAmountOfAvailableRecipes() {
        return getRecipeList().stream().filter(m -> m.isIngredientsInStock()).count();

    }

    public long generateRandomNumberInRangeAvailableRecipes() {
        long range = generateAmountOfAvailableRecipes();
        long random = (long) (Math.random() * range);
        return random;
    }

    // from stackoverflow: get nth number of stream:
    // OptionalInt result = stream.skip(n-1).findFirst();

    public Recipe generateDishOfTheDay() {
        long n = generateRandomNumberInRangeAvailableRecipes();
        return getRecipeList().stream().skip(n).findFirst().orElse(null);

    }
}
