package com.MolvenoLakeResort.model.restaurant;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class RecipeListTest {

    RecipeList sut = new RecipeList();

    @Mock
    List<Recipe> recipeList = new ArrayList<>();

    @Mock
    Recipe recipeTest1 = new Recipe();

    @Mock
    Recipe recipeTest2 = new Recipe();

    @Before
    public void setup() {
        
        recipeList.add(recipeTest1);
        recipeList.add(recipeTest2);


        sut.setRecipeList(recipeList);
    }

    @Test
    public void getAmountOfAvailableRecipesTest() {
        assertEquals(2, sut.getAmountOfAvailableRecipes());

    }

}