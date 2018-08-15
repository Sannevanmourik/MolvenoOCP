package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.Order;
import com.MolvenoLakeResort.model.restaurant.persistence.MenuRepository;
import com.MolvenoLakeResort.model.restaurant.persistence.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody Order newOrder) {


            return new ResponseEntity<Order>(this.orderRepository.save(newOrder), HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<Iterable<Order>> list() {
        return new ResponseEntity<Iterable<Order>>(this.orderRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Order> findById(@PathVariable long id) {
        Optional<Order> possibleOrder = this.orderRepository.findById(id);

        if (possibleOrder.isPresent()) {
            return new ResponseEntity<Order>(possibleOrder.get(), HttpStatus.OK);
        }

        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Order> updateById(@PathVariable long id, @RequestBody Order update) {
        Optional<Order> possibleOrder = this.orderRepository.findById(id);

        if (possibleOrder.isPresent()) {
            Order order = possibleOrder.get();
//            order.setPaid(update.isPaid());


            return new ResponseEntity<Order>(this.orderRepository.save(order), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Order> deleteById(@PathVariable long id) {
        Optional<Order> possibleOrder = this.orderRepository.findById(id);

        if (possibleOrder.isPresent()) {
            this.orderRepository.deleteById(id);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
