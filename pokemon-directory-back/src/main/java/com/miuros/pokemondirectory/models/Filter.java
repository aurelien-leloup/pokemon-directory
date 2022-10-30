package com.miuros.pokemondirectory.models;

import lombok.Data;

@Data
public class Filter {
    private String name;
    private int minHeight;
    private int minWeight;
    private int maxWeight;
    private int maxHeight;
}
