package com.miuros.pokemondirectory.service;

import com.miuros.pokemondirectory.client.PokeApiClient;
import com.miuros.pokemondirectory.models.Filter;
import com.miuros.pokemondirectory.models.Pokemon;
import org.apache.commons.lang3.Range;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PokemonService {


    public List<Pokemon> getPokemons(Filter filter) {
        Range<Integer> heightRange = Range.between(filter.getMinHeight(), filter.getMaxHeight());
        Range<Integer> weightRange = Range.between(filter.getMinWeight(), filter.getMaxWeight());

        return PokeApiClient
                .getAllPokemon()
                .getResults()
                .stream()
                .filter(pokeApiPokemonLink -> StringUtils.isBlank(filter.getName()) || StringUtils.contains(pokeApiPokemonLink.getName(), filter.getName()))
                .map(pokeApiPokemonLink -> PokeApiClient.getPokemonByName(pokeApiPokemonLink.getName()))
                .filter(pokemon -> heightRange.contains(pokemon.getHeight()) && weightRange.contains(pokemon.getWeight()))
                .toList();
    }
}
