//package com.MolvenoLakeResort.service;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.MockitoJUnitRunner;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.Assert.*;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//@RunWith(MockitoJUnitRunner.class)
//public class DishOfTheDayServiceTest {
//
//    RecipeList sut = new RecipeList();
//    RecipeList sut2 = new RecipeList();
//
//    List<Recipe> recipeList = new ArrayList<>();
//
//    @Mock
//    Recipe recipeTest1;
//
//
//    @Mock
//    Recipe recipeTest2;
//
//    @Mock
//    Recipe recipeTest3;
//
//    @Mock
//    Recipe recipeTest4;
//
//    @Before
//    public void setup() {
//
//        recipeList.add(recipeTest1);
//        recipeList.add(recipeTest2);
//        recipeList.add(recipeTest3);
//        recipeList.add(recipeTest4);
//
//
//        sut.setRecipeList(recipeList);
//    }
//
//    @Test
//    public void getAmountOfAvailableRecipesTest() {
//
//        when(recipeTest1.isIngredientsInStock()).thenReturn(true);
//        when(recipeTest2.isIngredientsInStock()).thenReturn(true);
//        when(recipeTest3.isIngredientsInStock()).thenReturn(true);
//        when(recipeTest4.isIngredientsInStock()).thenReturn(true);
//        assertEquals(4, sut.generateAmountOfAvailableRecipes());
//
//        verify(recipeTest1, Mockito.atMost(1)).isIngredientsInStock();
////        verify(recipeTest2, Mockito.never()).isIngredientsInStock();
//    }
//
//    @Test
//    public void generateRandomNumberInRangeAvailableRecipesTest() {
//        long value = sut.generateRandomNumberInRangeAvailableRecipes();
//        assertTrue(value <= 3 && value >= 0);
//    }
//
//
//    //     does this test ever fail?
//    @Test
//    public void getDishOfTheDayTest() {
//        Recipe dishOfTheDay = sut.generateDishOfTheDay();
//        assertTrue(dishOfTheDay.equals(recipeTest1) || dishOfTheDay.equals(recipeTest2)
//                || dishOfTheDay.equals(recipeTest3) || dishOfTheDay.equals(recipeTest4));
//    }
//
//    @Test
//    public void getDishOfTheDayTest2() {
//        Recipe dishOfTheDay = sut2.generateDishOfTheDay();
//        assertNull(dishOfTheDay);
//
//    }
//
//}