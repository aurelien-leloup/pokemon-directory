package com.miuros.pokemondirectory.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.miuros.pokemondirectory.client.PokeApiClient;
import com.miuros.pokemondirectory.client.PokeApiListResponse;
import com.miuros.pokemondirectory.client.PokeApiPokemon;
import com.miuros.pokemondirectory.client.PokeApiPokemonLink;
import com.miuros.pokemondirectory.models.Filter;
import com.miuros.pokemondirectory.models.Pokemon;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.Range;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@Log4j2
public class PokemonService {


    CacheLoader<String, PokeApiPokemon> loader = new CacheLoader<String, PokeApiPokemon>() {
        @Override
        public PokeApiPokemon load(String key) {
            return PokeApiClient.getPokemonByName(key);
        }
    };

    LoadingCache<String, PokeApiPokemon> cache = CacheBuilder.newBuilder().build(loader);


    @PostConstruct
    public void init() {
        PokeApiListResponse listResponse = PokeApiClient.getAllPokemon();
        List<PokeApiPokemonLink> pokeApiPokemonLinks = listResponse.getResults();
        int total = listResponse.getCount();
        int i = 1;

        for (PokeApiPokemonLink pokemonLink : pokeApiPokemonLinks) {
            log.info("Retrieving {}", pokemonLink.getName());
            PokeApiPokemon pokemon = PokeApiClient.getPokemonByName(pokemonLink.getName());
            log.info("{} / {} pokemon cached", i++, total);
            cache.put(pokemon.getName(), pokemon);
        }
    }

    public List<Pokemon> getPokemons(Filter filter) {
        Range<Double> heightRange = Range.between(filter.getMinHeight(), filter.getMaxHeight());
        Range<Double> weightRange = Range.between(filter.getMinWeight(), filter.getMaxWeight());


        return PokeApiClient
                .getAllPokemon()
                .getResults()
                .stream()
                .filter(pokeApiPokemonLink -> StringUtils.isBlank(filter.getName()) || StringUtils.contains(pokeApiPokemonLink.getName(), filter.getName()))
                .map(pokeApiPokemonLink -> cache.getUnchecked(pokeApiPokemonLink.getName()))
                .filter(pokemon -> heightRange.contains(pokemon.getHeight() / 10d) &&
                        weightRange.contains(pokemon.getWeight() / 10d))
                .map(this::transform)
                .toList();
    }

    private Pokemon transform(PokeApiPokemon pokeApiPokemon) {
        return new Pokemon(
                pokeApiPokemon.getName(),
                pokeApiPokemon.getSprites().getFront_default(),
                pokeApiPokemon.getWeight() / 10d,
                pokeApiPokemon.getHeight() / 10d);
    }
}
