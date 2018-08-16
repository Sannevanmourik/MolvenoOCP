package com.MolvenoLakeResort;


import com.MolvenoLakeResort.model.restaurant.Ingredient;
import com.MolvenoLakeResort.model.restaurant.MenuItem;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class App {
    public static void main(String[] args) {


        /*
        AppController app = new AppController();
        app.run();
        */

        SpringApplication.run(App.class, args);

        // super weird way to test function:
        // DOH! This should be a unit test !!!

//        MenuItem test = new MenuItem();
//        Ingredient test1 = new Ingredient();
//        Ingredient test2 = new Ingredient();
//        test1.setStock(10);
//        test2.setStock(100);
//        List<Ingredient> testList = new ArrayList<>();
//        testList.add(test1);
//        testList.add(test2);
//        test.setIngredientList(testList);
//
//        test.order();
//        System.out.println("Stock: " + test1.getStock() + " Stock: " + test2.getStock());
    }
}
