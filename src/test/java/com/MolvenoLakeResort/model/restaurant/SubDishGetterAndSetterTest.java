package com.MolvenoLakeResort.model.restaurant;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class SubDishGetterAndSetterTest {

    private SubDish subDish;

    @Mock
    private ArrayList<String> mockListOfIngredients;
    @Mock
    private ArrayList<String> mockListOfMenuItems;


    @Before
    public void setUp() {
        this.subDish = new SubDish();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetForId() {

        this.subDish.getId();

        long actual = this.subDish.getId();
        Assert.assertEquals(0, actual);
    }

    @Test
    public void testSetAndGetForName() {

        this.subDish.setName("Spaghetti");

        String actual = this.subDish.getName();
        Assert.assertEquals("Spaghetti", actual);

    }

    @Test
    public void testSetAndGetForIngredientListForSubDish() {
        when(mockListOfIngredients.get(0)).thenReturn("List retrieved");
        String result = mockListOfIngredients.get(0);
        Assert.assertEquals("List retrieved", result);
        verify(mockListOfIngredients).get(0);
    }

    @Test
    public void testSetAndGetForMenuItemList() {
        when(mockListOfMenuItems.get(0)).thenReturn("List retrieved");
        String result = mockListOfMenuItems.get(0);
        Assert.assertEquals("List retrieved", result);
        verify(mockListOfMenuItems).get(0);
    }

    @Test
    public void testGetForIsVegeterian() {

        this.subDish.isVegetarian();
        Boolean actual = this.subDish.isVegetarian();
        Assert.assertEquals(true, actual);
    }


}
