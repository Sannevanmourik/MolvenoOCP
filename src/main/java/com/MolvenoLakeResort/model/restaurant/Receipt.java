package com.MolvenoLakeResort.model.restaurant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Receipt {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private boolean paid;
    private LocalDate date;

    // a list of ordered items, coupled to a guest

    @ManyToMany
    @JoinTable(name = "menuItem_receipt",
            joinColumns = @JoinColumn(name = "menuItem_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "receipt_id", referencedColumnName = "id"))
    private List<MenuItem> orderedItemList = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "guest_id")
    private Guest guest;

    // set current date in constructor

    public Receipt () {
        this.date = date.now();
        // check if it works:
//        this.date = LocalDate.of(2014, Month.JANUARY, 1);
    }

    public LocalDate getDate() {
        return date;
    }

    public List<MenuItem> getOrderedItemList() {
        return orderedItemList;
    }

    public void setOrderedItemList(List<MenuItem> orderedItemList) {
        this.orderedItemList = orderedItemList;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public long getId() {
        return id;
    }

    public double getTotalPrice() {
        double totalPrice = getOrderedItemList().stream().mapToDouble(MenuItem::getSalesPrice).sum();
        return totalPrice;
    }

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }
}
