
package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.Allergy;
import com.MolvenoLakeResort.model.restaurant.MenuCategory;
import com.MolvenoLakeResort.model.restaurant.MenuItem;
import com.MolvenoLakeResort.model.restaurant.persistence.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("api/filter")
public class FilterMenuItemController {


    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getVegeterianMenuItems() {
        List<MenuItem> allMenuItems = (List<MenuItem>) this.menuItemRepository.findAll();
        List<MenuItem> allVegetarianMenuItems = allMenuItems
                .stream()
                .filter(MenuItem::isVegetarian)
                .collect(Collectors.toList());

        return allVegetarianMenuItems;
    }

    public List<MenuItem> getMenuItemsByCategory(MenuCategory category) {
        List<MenuItem> allMenuItems = (List<MenuItem>) this.menuItemRepository.findAll();
        List<MenuItem> menuItemsByCategory = allMenuItems
                .stream()
                .filter(menuItem -> menuItem.getMenuCategory() == category)
                .collect(Collectors.toList());

        return menuItemsByCategory;
    }

    public List<MenuItem> getMenuItemsByAllergy(Allergy allergy) {
        List<MenuItem> allMenuItems = (List<MenuItem>) this.menuItemRepository.findAll();
        List<MenuItem> menuItemsByAllergy = allMenuItems
                .stream()
                .filter(menuItem -> menuItem.canEatWithAllergy(allergy))
                .collect(Collectors.toList());

        return menuItemsByAllergy;
    }

    @GetMapping("vegetarian")
    public ResponseEntity<Iterable<MenuItem>> list() {
        return new ResponseEntity<Iterable<MenuItem>>(this.getVegeterianMenuItems(), HttpStatus.OK);
    }

    @GetMapping("category/{category}")
    public ResponseEntity<Iterable<MenuItem>> findByCategorie(@PathVariable MenuCategory category) {
        return new ResponseEntity<Iterable<MenuItem>>(this.getMenuItemsByCategory(category), HttpStatus.OK);
    }


    @GetMapping("allergy/{allergy}")
    public ResponseEntity<Iterable<MenuItem>> findByAllergy(@PathVariable Allergy allergy) {
        return new ResponseEntity<Iterable<MenuItem>>(this.getMenuItemsByAllergy(allergy), HttpStatus.OK);
    }


}
