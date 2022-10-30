package com.miuros.pokemondirectory.client;

import lombok.Data;

@Data
public class PokeApiPokemon {
    private int height;
    private int weight;
    private String name;
    private PokeApiSprite sprites;
}


