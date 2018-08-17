package com.MolvenoLakeResort.model.restaurant;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Recipe {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private String name;
    private double salesPrice;
    private MenuCategory menuCategory;

    // link to ingredients, same way as for menuItem
    @ManyToMany
    @JoinTable(name = "recipe_ingredient",
            joinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id", referencedColumnName = "id"))
    private List<Ingredient> ingredientListForRecipe = new ArrayList<>();


    // dish of the day generator: filter recipes on isIngredientInStock, get length list,
    // generate a random number in the range of the list
    // select dish from list based on random number
    // show DISH OF THE DAY on menu (menu category?)

//    private List<Recipe> recipeList = new ArrayList<>();



    // getters and setters


    public List<Ingredient> getIngredientListForRecipe() {
        return ingredientListForRecipe;
    }

    public void setIngredientList(List<Ingredient> ingredientListForRecipe) {
        this.ingredientListForRecipe = ingredientListForRecipe;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalesPrice() {
        return salesPrice;
    }

    public void setSalesPrice(double salesPrice) {
        this.salesPrice = salesPrice;
    }

    public MenuCategory getMenuCategory() {
        return menuCategory;
    }

    public void setMenuCategory(MenuCategory menuCategory) {
        this.menuCategory = menuCategory;
    }

    public long getId() {
        return id;
    }

    public boolean isIngredientsInStock() {
        return getIngredientListForRecipe().stream().allMatch(Ingredient::isInStock);
    }


}
