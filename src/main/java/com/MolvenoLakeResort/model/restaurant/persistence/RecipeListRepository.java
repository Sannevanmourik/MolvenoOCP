package com.MolvenoLakeResort.model.restaurant.persistence;

import com.MolvenoLakeResort.model.restaurant.Recipe;
import com.MolvenoLakeResort.model.restaurant.RecipeList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeListRepository extends CrudRepository<RecipeList, Long> {


}
