package com.MolvenoLakeResort.model.restaurant;

import com.MolvenoLakeResort.service.DishOfTheDayService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
public class MenuItem {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private String name;
    private double salesPrice;
    private MenuCategory menuCategory;
    private long amountOfTimesOrdered; // this should also go in a service



    @ManyToMany
    @JoinTable(name = "menuItem_ingredient",
            joinColumns = @JoinColumn(name = "menuItem_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id", referencedColumnName = "id"))
    private List<Ingredient> ingredientList = new ArrayList<>();


    @ManyToMany
    @JoinTable(name = "menuItem_subDish",
            joinColumns = @JoinColumn(name = "menuItem_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "subDish_id", referencedColumnName = "id"))
    private List<SubDish> subDishList = new ArrayList<>();

    @ManyToMany(mappedBy = "orderedItemList")
    @JsonIgnore // print geen tabel van subDishes
    private List<Receipt> receiptList;





// add constructor

    public MenuItem() {

    }

    public MenuItem(String name, double salesPrice) {
        this.name = name;
        this.salesPrice = salesPrice;
    }

    // order function: for each ingredient in ingredientlist, decrement stock with 1

    // this function should go somewhere else!
    public void order() {
        getIngredientList().stream().forEach(i -> i.reduceStock());
        amountOfTimesOrdered++;


    }

// Dit is een test!!!!

    // add getter and setter


    public long getAmountOfTimesOrdered() {
        return amountOfTimesOrdered;
    }

    public MenuCategory getMenuCategory() {
        return menuCategory;
    }

    public void setMenuCategory(MenuCategory menuCategory) {
        this.menuCategory = menuCategory;
    }

    public List<Ingredient> getIngredientList() {
        return ingredientList;
    }

    public void setIngredientList(List<Ingredient> ingredientList) {
        this.ingredientList = ingredientList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return this.id;
    }

    public double getSalesPrice() {
        return salesPrice;
    }

    public void setSalesPrice(double salesPrice) {
        this.salesPrice = salesPrice;
    }

    public double getCalculatedPrice() {
        double totalPriceIngredientList = getIngredientList().stream().mapToDouble(Ingredient::getPrice).sum();
        double totalPriceSubDishList = getSubDishList().stream().flatMapToDouble(s -> s.getIngredientListForSubDish().stream().mapToDouble(Ingredient::getPrice)).sum();
        return totalPriceIngredientList + totalPriceSubDishList;
    }

    public boolean isVegetarian() {
        return getIngredientList().stream().allMatch(Ingredient::isVegetarian);
    }

    public double getProfit() {
        return getSalesPrice() - getCalculatedPrice();
    }

    public boolean isIngredientsInStock() {
        return getIngredientList().stream().allMatch(Ingredient::isInStock);
    }

    public List<SubDish> getSubDishList() {
        return subDishList;
    }

    public void setSubDishList(List<SubDish> subDishList) {
        this.subDishList = subDishList;

    }

    public List<Receipt> getReceiptList() {
        return receiptList;
    }

    public void setReceiptList(List<Receipt> receiptList) {
        this.receiptList = receiptList;

    }


    public List<Allergy> getFilteredListOfAllergiesPerMenuItem() {
        List<Allergy> listOfAllergiesFromIngredients = getIngredientList().parallelStream().map(Ingredient::getAllergy).collect(Collectors.toList());
        List<Allergy> listOfAllergiesFromSubDishes = getSubDishList().parallelStream().flatMap(s -> s.getIngredientListForSubDish().stream().map(Ingredient::getAllergy)).collect(Collectors.toList());
        List<Allergy> listofAllAllergiesFromMenuItem = Stream.concat(listOfAllergiesFromIngredients.stream(), listOfAllergiesFromSubDishes.stream()).collect(Collectors.toList());

        List<Allergy> filteredListOfAllAllergiesFromMenuItem = listofAllAllergiesFromMenuItem.stream().filter(a -> a != null).distinct().collect(Collectors.toList());

        return filteredListOfAllAllergiesFromMenuItem;
        
    }


}


//        List<Y> createEnumList() {
//        return Stream.of(Y.values())
//        .flatMap(y -> IntStream.range(0, y.getI()).mapToObj(i -> y))
//        .collect(toList());




