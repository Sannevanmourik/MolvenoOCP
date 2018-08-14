package com.MolvenoLakeResort.model.restaurant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Ingredient {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private String name;
    private double price;

    @ManyToMany(mappedBy = "ingredientList")
    @JsonIgnore // print geen tabel van menuItems
    private List<MenuItem> menuItemList;

    public Ingredient(String name, long id, double price) {
        this.name = name;
        this.id = id;
        this.price = price;
    }

    public Ingredient() {
    }

    // add getter and setter




    public List<MenuItem> getMenuItemList() {
        return menuItemList;
    }

    public void setMenuItemList(List<MenuItem> menuItemList) {
        this.menuItemList = menuItemList;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }

}