package com.MolvenoLakeResort.model.restaurant;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

public class RecipeListTest {

    RecipeList sut = new RecipeList();

    @Mock
    List<Recipe> recipeList = new ArrayList<>();

    @Mock
    Recipe recipeTest1 = new Recipe();

    @Mock
    Recipe recipeTest2 = new Recipe();

    @Mock
    Recipe recipeTest3 = new Recipe();

    @Mock
    Recipe recipeTest4 = new Recipe();

    @Before
    public void setup() {

        recipeList.add(recipeTest1);
        recipeList.add(recipeTest2);
        recipeList.add(recipeTest3);
        recipeList.add(recipeTest4);


        sut.setRecipeList(recipeList);
    }

    @Test
    public void getAmountOfAvailableRecipesTest() {
        assertEquals(4, sut.getAmountOfAvailableRecipes());

    }

    @Test
    public void generateRandomNumberInRangeAvailableRecipesTest() {
        long value = sut.generateRandomNumberInRangeAvailableRecipes();
        assertTrue(value <= 3 && value >= 0);
    }

    @Test
    public void getDishOfTheDayTest() {
        Recipe dishOfTheDay = sut.getDishOfTheDay();
        assertTrue(dishOfTheDay.equals(recipeTest1) || dishOfTheDay.equals(recipeTest2)
        || dishOfTheDay.equals(recipeTest3) || dishOfTheDay.equals(recipeTest4));
    }

}