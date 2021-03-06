package com.MolvenoLakeResort.model.restaurant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
public class Ingredient implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private String name;
    private double price;
    private boolean vegetarian;
    private long stock;
    private boolean inStock = false;
    private Allergy allergy;

    @ManyToMany(mappedBy = "ingredientList")
    @JsonIgnore // print geen tabel van menuItems
    private List<MenuItem> menuItemList;

    @ManyToMany(mappedBy = "ingredients")
    @JsonIgnore // print geen tabel van subDishes
    private List<SubDish> subDishList;

    public Ingredient(String name, long id, double price) {
        this.name = name;
        this.id = id;
        this.price = price;
    }

    public Ingredient() {
    }

    // add getter and setter


    public boolean isInStock() {
        if (stock > 0) {
            return true;
        } else {
            return false;
        }
    }

    public void reduceStock() {
        stock--;
    }

    public long getStock() {
        return stock;
    }

    public void setStock(long stock) {
        this.stock = stock;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

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

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<SubDish> getSubDishList() {
        return subDishList;
    }

    public void setSubDishList(List<SubDish> subDishList) {
        this.subDishList = subDishList;
    }

    public Allergy getAllergy() {
        return allergy;
    }

    public void setAllergy(Allergy allergy) {
        this.allergy = allergy;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }

}