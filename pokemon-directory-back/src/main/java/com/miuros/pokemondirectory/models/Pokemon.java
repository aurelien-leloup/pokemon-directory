package com.miuros.pokemondirectory.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Pokemon {
    private String name;
    private String sprite;
    private double weight;
    private double height;
}
