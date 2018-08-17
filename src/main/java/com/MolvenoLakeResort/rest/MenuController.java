package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.Menu;
import com.MolvenoLakeResort.model.restaurant.persistence.MenuRepository;
import com.MolvenoLakeResort.service.DishOfTheDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("api/menu")
public class MenuController {

    @Autowired
    private DishOfTheDayService dishOfTheDayService;

    @Autowired
    private MenuRepository menuRepository;

    @PostMapping
    public ResponseEntity<Menu> create(@RequestBody Menu newMenu) {
        Optional<Menu> possibleMenu = this.menuRepository.findByName(newMenu.getName());

        if (possibleMenu.isPresent()) {
            Menu existingMenu = possibleMenu.get();
            return new ResponseEntity<Menu>(HttpStatus.CONFLICT);


        } else {
            newMenu.setDishOfTheDay(dishOfTheDayService.generateDishOfTheDay());
            return new ResponseEntity<Menu>(this.menuRepository.save(newMenu), HttpStatus.CREATED);
        }
    }

    @GetMapping
    public ResponseEntity<Iterable<Menu>> list() {
        return new ResponseEntity<Iterable<Menu>>(this.menuRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Menu> findById(@PathVariable long id) {
        Optional<Menu> possibleMenu = this.menuRepository.findById(id);

        if (possibleMenu.isPresent()) {
            return new ResponseEntity<Menu>(possibleMenu.get(), HttpStatus.OK);
        }

        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Menu> updateById(@PathVariable long id, @RequestBody Menu update) {
        Optional<Menu> possibleMenu = this.menuRepository.findById(id);

        if (possibleMenu.isPresent()) {
            Menu menu = possibleMenu.get();
            menu.setName(update.getName());
            menu.setMenuItemList(update.getMenuItemList());
            menu.setSeason(update.getSeason());


            return new ResponseEntity<Menu>(this.menuRepository.save(menu), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Menu> deleteById(@PathVariable long id) {
        Optional<Menu> possibleMenu = this.menuRepository.findById(id);

        if (possibleMenu.isPresent()) {
            this.menuRepository.deleteById(id);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
