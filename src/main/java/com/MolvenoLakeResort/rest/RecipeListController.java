package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.RecipeList;
import com.MolvenoLakeResort.model.restaurant.persistence.RecipeListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("api/recipelist")
public class RecipeListController {

    @Autowired
    private RecipeListRepository recipeListRepository;

    @PostMapping
    public ResponseEntity<RecipeList> create(@RequestBody RecipeList newRecipeList) {

            return new ResponseEntity<RecipeList>(this.recipeListRepository.save(newRecipeList), HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<Iterable<RecipeList>> list() {
        return new ResponseEntity<Iterable<RecipeList>>(this.recipeListRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<RecipeList> findById(@PathVariable long id) {
        Optional<RecipeList> possibleRecipeList = this.recipeListRepository.findById(id);

        if (possibleRecipeList.isPresent()) {
            return new ResponseEntity<RecipeList>(possibleRecipeList.get(), HttpStatus.OK);
        }

        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<RecipeList> updateById(@PathVariable long id, @RequestBody RecipeList update) {
        Optional<RecipeList> possibleRecipeList = this.recipeListRepository.findById(id);

        if (possibleRecipeList.isPresent()) {
            RecipeList recipeList = possibleRecipeList.get();
            recipeList.setRecipeList(update.getRecipeList());

            return new ResponseEntity<RecipeList>(this.recipeListRepository.save(recipeList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RecipeList> deleteById(@PathVariable long id) {
        Optional<RecipeList> possibleRecipeList = this.recipeListRepository.findById(id);

        if (possibleRecipeList.isPresent()) {
            this.recipeListRepository.deleteById(id);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
