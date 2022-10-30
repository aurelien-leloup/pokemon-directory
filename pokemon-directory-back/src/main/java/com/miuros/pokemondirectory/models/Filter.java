package com.miuros.pokemondirectory.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Filter {
    private String name;
    private double minHeight;
    private double minWeight;
    private double maxWeight;
    private double maxHeight;
}
