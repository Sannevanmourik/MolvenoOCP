package com.MolvenoLakeResort.service;

import com.MolvenoLakeResort.model.restaurant.MenuItem;
import org.springframework.stereotype.Service;

import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Service
public class DishOfTheDayService {
    // filter lijst van menuItems op basis van isIngredientsInStock
    // haal de lengte van de lijst op
    // genereer een random number in de range vd lijst
    // selecteer een menuItem uit de lijst op basis van random number
    // zet dit als menuItem op het menu (menuCategory: DishOfTheDay, price 10)

    private List<MenuItem> menuItemList = new ArrayList<>();

    public List<MenuItem> getMenuItemList() {
        return menuItemList;
    }

    public long generateAmountOfAvailableMenuItems() {
        return getMenuItemList().stream().filter(m -> m.isIngredientsInStock()).count();

    }

    public long generateRandomNumberInRangeAvailableMenuItems() {
        long range = generateAmountOfAvailableMenuItems();
        long random = (long) (Math.random() * range);
        return random;
    }

    // from stackoverflow: get nth number of stream:
    // OptionalInt result = stream.skip(n-1).findFirst();

    public MenuItem generateDishOfTheDay() {
        long n = generateRandomNumberInRangeAvailableMenuItems();
        return getMenuItemList().stream().skip(n).findFirst().orElse(null);

    }
}
