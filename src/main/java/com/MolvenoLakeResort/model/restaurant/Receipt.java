package com.MolvenoLakeResort.model.restaurant;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Receipt {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private boolean paid;

    // a list of ordered items, coupled to a table

    @OneToMany
//    @JoinColumn(name = "menuItem_id")
    private List<MenuItem> orderedItemList = new ArrayList<>();


    // write a getter to get the total price WITH A FLATMAP :D

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
}
