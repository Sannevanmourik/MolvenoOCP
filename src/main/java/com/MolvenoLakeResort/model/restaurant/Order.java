package com.MolvenoLakeResort.model.restaurant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Order {

    @Id
    @GeneratedValue
    private long id;
    private LocalDate date;
//    private double totalOrderCost;
//    private PaymentStatus statusOfPayment;
    private boolean paid;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }
}
