package com.MolvenoLakeResort.model.restaurant;

public enum Allergy {

    GLUTEN("Gluten"),
    EGG("Egg"),
    COWMILK ("Cow's milk"),
    TREENUTS("Tree nuts"),
    PEANUTS("Peanuts"),
    SHELLFISH("Shellfish"),
    SOY("Soy");


    private final String description;

    Allergy(String description) {
        this.description = description;

    }

    public String getDescription() {
        return description;
    }
}
