package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.MenuItem;
import com.MolvenoLakeResort.model.restaurant.persistence.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/popular")
public class MostPopularDishes {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> mostPopular() {
        List<MenuItem> allMenuItems = (List<MenuItem>) this.menuItemRepository.findAll();
        allMenuItems = allMenuItems.stream()
                .sorted(Comparator.comparing(MenuItem::getAmountOfTimesOrdered).reversed())
                .limit(5)
                .collect(Collectors.toList());

        for(MenuItem test : allMenuItems){
            System.out.println("Dish name: "+test.getName() + " #"+ test.getAmountOfTimesOrdered());
        }
        return allMenuItems;
    }

    @GetMapping
    public ResponseEntity<Iterable<MenuItem>> list() {
        return new ResponseEntity<Iterable<MenuItem>>(this.mostPopular(), HttpStatus.OK);
    }

//    @GetMapping("{id}")
//    public ResponseEntity<MenuItem> findById(@PathVariable long id) {
//        Optional<MenuItem> possibleMenuItem = this.menuItemRepository.findById(id);
//        if (possibleMenuItem.isPresent()) {
//            return new ResponseEntity<MenuItem>(possibleMenuItem.get(), HttpStatus.OK);
//        }
//        else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

//    @PostMapping
//    public ResponseEntity<MenuItem> create(@RequestBody MenuItem newMenuItem) {
//        Optional<MenuItem> possibleMenuItem = this.menuItemRepository.findByName(newMenuItem.getName());
//
//        if (possibleMenuItem.isPresent()) {
//            MenuItem existingMenuItem = possibleMenuItem.get();
//            return new ResponseEntity<MenuItem>(HttpStatus.CONFLICT);
////            if (existingMenuItem.getName().equals(newMenuItem.getName())) {
////                return new ResponseEntity<MenuItem>(HttpStatus.CONFLICT);
////            } else {
////                return new ResponseEntity<MenuItem>(this.menuItemRepository.save(newMenuItem), HttpStatus.CREATED);
////            }
//        } else {
//            return new ResponseEntity<MenuItem>(this.menuItemRepository.save(newMenuItem), HttpStatus.CREATED);
//        }
//    }


//    @PutMapping("{id}")
//    public ResponseEntity<MenuItem> updateById(@PathVariable long id, @RequestBody MenuItem update) {
//        Optional<MenuItem> possibleMenuItem = this.menuItemRepository.findById(id);
//
//        if (possibleMenuItem.isPresent()) {
//            MenuItem menuItem = possibleMenuItem.get();
//            menuItem.setName(update.getName());
//            menuItem.setSalesPrice(update.getSalesPrice());
//            menuItem.setIngredientList(update.getIngredientList());
//            menuItem.setMenuCategory(update.getMenuCategory());
//            menuItem.setSubDishList(update.getSubDishList());
//            menuItem.setReceiptList(update.getReceiptList());
//
//
//            return new ResponseEntity<MenuItem>(this.menuItemRepository.save(menuItem), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<MenuItem> deleteById(@PathVariable long id) {
//        Optional<MenuItem> possibleMenuItem = this.menuItemRepository.findById(id);
//
//        if (possibleMenuItem.isPresent()) {
//            this.menuItemRepository.deleteById(id);
//        }
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}
