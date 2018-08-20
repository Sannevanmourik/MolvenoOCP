package com.MolvenoLakeResort.model.restaurant.persistence;

import com.MolvenoLakeResort.model.restaurant.Menu;
import com.MolvenoLakeResort.model.restaurant.Receipt;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ReceiptRepository extends CrudRepository<Receipt, Long> {



}
