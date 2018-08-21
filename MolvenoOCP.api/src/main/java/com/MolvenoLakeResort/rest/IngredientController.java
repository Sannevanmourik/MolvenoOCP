package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.Guest;
import com.MolvenoLakeResort.model.restaurant.Ingredient;
import com.MolvenoLakeResort.model.restaurant.persistence.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("api/ingredients")
@CrossOrigin(origins = "http://localhost:4200")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    @PostMapping
    public ResponseEntity<Ingredient> create(@RequestBody Ingredient newIngredient) {
        Optional<Ingredient> possibleIngredient = this.ingredientRepository.findByName(newIngredient.getName());

            if (((newIngredient.getName() == null) || newIngredient.getName().equals(""))) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        if (!(newIngredient.getName().matches("[a-zA-Z]+"))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
         else if (possibleIngredient.isPresent()) {
            Ingredient existingIngredient = possibleIngredient.get();
            return new ResponseEntity<Ingredient>(HttpStatus.CONFLICT);
        }
        else if (newIngredient.getPrice() < 0){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        else {

            return new ResponseEntity<Ingredient>(this.ingredientRepository.save(newIngredient), HttpStatus.CREATED);
        }
    }


    @GetMapping
    public ResponseEntity<Iterable<Ingredient>> list() {
        return new ResponseEntity<Iterable<Ingredient>>(this.ingredientRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Ingredient> findById(@PathVariable long id) {
        Optional<Ingredient> possibleIngredient = this.ingredientRepository.findById(id);

        if (possibleIngredient.isPresent()) {
            return new ResponseEntity<Ingredient>(possibleIngredient.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Ingredient> updateById(@PathVariable long id, @RequestBody Ingredient update) {
        Optional<Ingredient> possibleIngredient = this.ingredientRepository.findById(id);


        if ((update.getName().equals("")) ) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!(update.getName().contains("[a-zA-Z]+"))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else if (update.getPrice() < 0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (possibleIngredient.isPresent()) {
            Ingredient ingredient = possibleIngredient.get();
            ingredient.setName(update.getName());
            ingredient.setPrice(update.getPrice());
            ingredient.setVegetarian(update.isVegetarian());
            ingredient.setStock(update.getStock());
            ingredient.setMenuItemList(update.getMenuItemList());
            ingredient.setSubDishList(update.getSubDishList());
            ingredient.setAllergy(update.getAllergy());

            return new ResponseEntity<Ingredient>(this.ingredientRepository.save(ingredient), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Ingredient> deleteById(@PathVariable long id) {
        Optional<Ingredient> possibleIngredient = this.ingredientRepository.findById(id);

        if (possibleIngredient.isPresent()) {
            this.ingredientRepository.deleteById(id);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}