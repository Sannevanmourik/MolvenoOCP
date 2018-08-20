package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.Receipt;
import com.MolvenoLakeResort.model.restaurant.persistence.MenuRepository;
import com.MolvenoLakeResort.model.restaurant.persistence.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("api/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptRepository receiptRepository;

    @PostMapping
    public ResponseEntity<Receipt> create(@RequestBody Receipt newReceipt) {

            return new ResponseEntity<Receipt>(this.receiptRepository.save(newReceipt), HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<Iterable<Receipt>> list() {
        return new ResponseEntity<Iterable<Receipt>>(this.receiptRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Receipt> findById(@PathVariable long id) {
        Optional<Receipt> possibleReceipt = this.receiptRepository.findById(id);

        if (possibleReceipt.isPresent()) {
            return new ResponseEntity<Receipt>(possibleReceipt.get(), HttpStatus.OK);
        }

        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Receipt> updateById(@PathVariable long id, @RequestBody Receipt update) {
        Optional<Receipt> possibleReceipt = this.receiptRepository.findById(id);

        if (possibleReceipt.isPresent()) {
            Receipt receipt = possibleReceipt.get();
            receipt.setPaid(update.isPaid());
            receipt.setOrderedItemList(update.getOrderedItemList());
            receipt.setGuest(update.getGuest());


            return new ResponseEntity<Receipt>(this.receiptRepository.save(receipt), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Receipt> deleteById(@PathVariable long id) {
        Optional<Receipt> possibleReceipt = this.receiptRepository.findById(id);

        if (possibleReceipt.isPresent()) {
            this.receiptRepository.deleteById(id);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
