package com.MolvenoLakeResort.service;

import com.MolvenoLakeResort.model.restaurant.Menu;
import com.MolvenoLakeResort.model.restaurant.MenuItem;
import com.MolvenoLakeResort.model.restaurant.persistence.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private MenuItemRepository repository;



    public List<MenuItem> getMenuItemList() {
        List<MenuItem> menuItems = new ArrayList<>();
        repository.findAll().forEach(menuItems::add);
        return menuItems;
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
