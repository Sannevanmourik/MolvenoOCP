package com.MolvenoLakeResort.rest;

import com.MolvenoLakeResort.model.restaurant.Booking;
import com.MolvenoLakeResort.model.restaurant.persistence.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
    @RequestMapping("Bookings")
    public class BookingController {

    @Autowired
    private BookingRepository bookings;

    @GetMapping
    public Collection<Booking> getAllBookings(){
        return this.bookings.findAll();
    }

    @GetMapping("{capacity}/{date}") //date input : "2010-06-25T14:25"
    public List<Booking> searchResultByCapcityAndTime(){
        return searchResultByCapcityAndTime;
    }

    @PostMapping
    public Booking create(@RequestBody Booking newBooking){
        this.bookings.add(newBooking);
        return newBooking;
    }
}