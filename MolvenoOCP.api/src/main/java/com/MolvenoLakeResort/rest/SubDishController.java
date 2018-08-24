package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.SubDish;
import com.MolvenoLakeResort.model.restaurant.persistence.SubDishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/subDishes")
public class SubDishController {

    @Autowired
    private SubDishRepository subDishRespository;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<SubDish> create(@RequestBody SubDish newSubDish) {
        Optional<SubDish> possibleSubDish = this.subDishRespository.findByName(newSubDish.getName());

        if (((newSubDish.getName() == null) || newSubDish.getName().equals(""))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!(newSubDish.getName().matches("[a-z|\\sA-Z|\\s]+"))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (possibleSubDish.isPresent()) {
            SubDish existingSubDish = possibleSubDish.get();
            return new ResponseEntity<SubDish>(HttpStatus.CONFLICT);

        } else {

            return new ResponseEntity<SubDish>(this.subDishRespository.save(newSubDish), HttpStatus.CREATED);
        }
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Iterable<SubDish>> list() {
        return new ResponseEntity<Iterable<SubDish>>(this.subDishRespository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<SubDish> findById(@PathVariable long id) {
        Optional<SubDish> possibleSubDish = this.subDishRespository.findById(id);

        if (possibleSubDish.isPresent()) {
            return new ResponseEntity<SubDish>(possibleSubDish.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<SubDish> updateById(@PathVariable long id, @RequestBody SubDish update) {
        Optional<SubDish> possibleSubDish = this.subDishRespository.findById(id);

        if ((update.getName().equals("")) || (update.getName() == null)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!(update.getName().matches("[a-z|\\sA-Z|\\s]+"))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (possibleSubDish.isPresent()) {
            SubDish subDish = possibleSubDish.get();
            subDish.setName(update.getName());
            subDish.setIngredients(update.getIngredients());


            return new ResponseEntity<SubDish>(this.subDishRespository.save(subDish), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<SubDish> deleteById(@PathVariable long id) {
        Optional<SubDish> possibleSubDish = this.subDishRespository.findById(id);

        if (possibleSubDish.isPresent()) {
            this.subDishRespository.deleteById(id);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
