package com.miuros.pokemondirectory.client;

import com.miuros.pokemondirectory.models.Pokemon;
import kong.unirest.Unirest;
import lombok.experimental.UtilityClass;

@UtilityClass
public class PokeApiClient {

    private static final String URL = "https://pokeapi.co/api/v2/pokemon/";
    private static final int LIMIT = 2000;

    public static PokeApiListResponse getAllPokemon() {
        return Unirest.get(URL)
                .header("accept", "application/json")
                .queryString("limit", LIMIT)
                .asObject(PokeApiListResponse.class)
                .getBody();
    }

    public static PokeApiPokemon getPokemonByName(String name) {
        return Unirest.get(URL + name)
                .header("accept", "application/json")
                .asObject(PokeApiPokemon.class)
                .getBody();
    }
}
