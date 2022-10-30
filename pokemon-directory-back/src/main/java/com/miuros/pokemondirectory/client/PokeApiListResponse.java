package com.miuros.pokemondirectory.client;

import lombok.Data;

import java.util.List;

@Data
public class PokeApiListResponse {
    int count;
    List<PokeApiPokemonLink> results;
}
