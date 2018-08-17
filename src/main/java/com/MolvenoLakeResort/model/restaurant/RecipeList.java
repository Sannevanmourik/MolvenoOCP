package com.MolvenoLakeResort.model.restaurant;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
}
