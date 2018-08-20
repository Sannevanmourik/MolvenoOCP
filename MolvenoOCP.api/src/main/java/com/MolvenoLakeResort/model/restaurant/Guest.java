package com.MolvenoLakeResort.model.restaurant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Guest extends User implements Serializable{

    private String phoneNumber;

    @OneToMany(mappedBy = "guest")
    private Set<Booking> bookings = new HashSet<>();

    @OneToMany(mappedBy = "guest")
    @JsonIgnore
    private List<Receipt> receipts = new ArrayList<>();

    public Guest() {
    }

    public Guest(String firstName, String lastName) {
        super(firstName, lastName);
    }

    public Guest(String firstName, String lastName, String phoneNumber) {
        super(firstName, lastName);
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Receipt> getReceipts() {
        return receipts;
    }

    public void setReceipts(List<Receipt> receipts) {
        this.receipts = receipts;
    }
}

