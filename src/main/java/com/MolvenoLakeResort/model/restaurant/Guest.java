package com.MolvenoLakeResort.model.restaurant;

import javax.persistence.Entity;
import java.io.Serializable;
import java.time.LocalDate;

public class Guest extends User {


    private String phoneNumber;

    public Guest(String firstName, String lastName, String phoneNumber) {
        super(firstName, lastName);
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

