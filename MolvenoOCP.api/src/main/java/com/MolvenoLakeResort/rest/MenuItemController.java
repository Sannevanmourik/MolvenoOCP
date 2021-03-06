package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.MenuItem;
import com.MolvenoLakeResort.model.restaurant.persistence.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/menuItems")
public class MenuItemController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<MenuItem> create(@RequestBody MenuItem newMenuItem) {
        Optional<MenuItem> possibleMenuItem = this.menuItemRepository.findByName(newMenuItem.getName());

        if (((newMenuItem.getName() == null) || newMenuItem.getName().equals(""))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!(newMenuItem.getName().matches("[a-z|\\sA-Z|\\s]+"))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (possibleMenuItem.isPresent()) {
            MenuItem existingMenuItem = possibleMenuItem.get();
            return new ResponseEntity<MenuItem>(HttpStatus.CONFLICT);


        } else {
            return new ResponseEntity<MenuItem>(this.menuItemRepository.save(newMenuItem), HttpStatus.CREATED);
        }
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Iterable<MenuItem>> list() {
        return new ResponseEntity<Iterable<MenuItem>>(this.menuItemRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<MenuItem> findById(@PathVariable long id) {
        Optional<MenuItem> possibleMenuItem = this.menuItemRepository.findById(id);
        if (possibleMenuItem.isPresent()) {
            return new ResponseEntity<MenuItem>(possibleMenuItem.get(), HttpStatus.OK);
        }

        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<MenuItem> updateById(@PathVariable long id, @RequestBody MenuItem update) {
        Optional<MenuItem> possibleMenuItem = this.menuItemRepository.findById(id);

        if ((update.getName().equals("")) || (update.getName() == null)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!(update.getName().matches("[a-z|\\sA-Z|\\s]+"))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (possibleMenuItem.isPresent()) {
            MenuItem menuItem = possibleMenuItem.get();
            menuItem.setName(update.getName());
            menuItem.setSalesPrice(update.getSalesPrice());
            menuItem.setIngredientList(update.getIngredientList());
            menuItem.setMenuCategory(update.getMenuCategory());
            menuItem.setSubDishList(update.getSubDishList());
            menuItem.setReceiptList(update.getReceiptList());


            return new ResponseEntity<MenuItem>(this.menuItemRepository.save(menuItem), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<MenuItem> deleteById(@PathVariable long id) {
        Optional<MenuItem> possibleMenuItem = this.menuItemRepository.findById(id);

        if (possibleMenuItem.isPresent()) {
            this.menuItemRepository.deleteById(id);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
