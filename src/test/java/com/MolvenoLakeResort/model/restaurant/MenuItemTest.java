package com.MolvenoLakeResort.model.restaurant;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class MenuItemTest {

    MenuItem sut;

    @Mock
    List<Ingredient> ingredientList = new ArrayList<>();
    @Mock
    List<Ingredient> ingredientList2 = new ArrayList<>();
    Ingredient testIngredient1 = new Ingredient("test", 1, 1.1);
    Ingredient testIngredient2 = new Ingredient("test", 1, 1.1);
    Ingredient testIngredient3 = new Ingredient("test", 1, 1.1);

    @Before
    public void setUp() throws Exception {

        // mock ingredientList here to test stream methods? or..
        setupMock();


    }

    public void setupMock() {
//        Mockito.when(iets).thenReturn(naareenklasse);
        
        ingredientList.add(testIngredient1);
        ingredientList.add(testIngredient2);
        ingredientList.add(testIngredient3);


    }

    @Test
    public void getCalculatedPriceTest() {
        sut.getCalculatedPrice();
        assertEquals(3.3,ingredientList.stream().mapToDouble(Ingredient::getPrice).sum(),0.005);
        assertEquals(0, ingredientList2.stream().mapToDouble(Ingredient::getPrice).sum(), 0.005 );
    }

    @Test
    public void isVegetarian() {
        assertEquals(false, ingredientList.stream().allMatch(Ingredient::isVegetarian));
    }
}