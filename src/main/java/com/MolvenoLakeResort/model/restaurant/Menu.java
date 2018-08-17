package com.MolvenoLakeResort.model.restaurant;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Menu {

    @Id
    @GeneratedValue
    private long id;
    private String name;
    private Season season;

    @OneToMany
    @JoinColumn(name = "menuItem_id")
    private List<MenuItem> menuItemList = new ArrayList<>();


    public long getId() {
        return id;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public List<MenuItem> getMenuItemList() {
        return menuItemList;
    }

    public void setMenuItemList(List<MenuItem> menuItemList) {
        this.menuItemList = menuItemList;
    }




}
