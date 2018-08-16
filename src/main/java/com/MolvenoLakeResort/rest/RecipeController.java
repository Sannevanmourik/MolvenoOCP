package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.Recipe;
import com.MolvenoLakeResort.model.restaurant.persistence.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping
    public ResponseEntity<Recipe> create(@RequestBody Recipe newRecipe) {
        Optional<Recipe> possibleRecipe = this.recipeRepository.findByName(newRecipe.getName());

        if (possibleRecipe.isPresent()) {
            Recipe existingRecipe = possibleRecipe.get();
            return new ResponseEntity<Recipe>(HttpStatus.CONFLICT);


        } else {

            return new ResponseEntity<Recipe>(this.recipeRepository.save(newRecipe), HttpStatus.CREATED);
        }
    }

    @GetMapping
    public ResponseEntity<Iterable<Recipe>> list() {
        return new ResponseEntity<Iterable<Recipe>>(this.recipeRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Recipe> findById(@PathVariable long id) {
        Optional<Recipe> possibleRecipe = this.recipeRepository.findById(id);

        if (possibleRecipe.isPresent()) {
            return new ResponseEntity<Recipe>(possibleRecipe.get(), HttpStatus.OK);
        }

        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Recipe> updateById(@PathVariable long id, @RequestBody Recipe update) {
        Optional<Recipe> possibleRecipe = this.recipeRepository.findById(id);

        if (possibleRecipe.isPresent()) {
            Recipe recipe = possibleRecipe.get();
            recipe.setName(update.getName());
            recipe.setMenuCategory(update.getMenuCategory());
            recipe.setSalesPrice(update.getSalesPrice());



            return new ResponseEntity<Recipe>(this.recipeRepository.save(recipe), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Recipe> deleteById(@PathVariable long id) {
        Optional<Recipe> possibleRecipe = this.recipeRepository.findById(id);

        if (possibleRecipe.isPresent()) {
            this.recipeRepository.deleteById(id);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}