package com.miuros.pokemondirectory.controller;

import com.miuros.pokemondirectory.models.Filter;
import com.miuros.pokemondirectory.models.Pokemon;
import com.miuros.pokemondirectory.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {

    @Autowired
    PokemonService pokemonService;

    @GetMapping
    @ResponseBody
    @CrossOrigin
    public List<Pokemon> getPokemons(
            @RequestParam String name,
            @RequestParam int maxHeight,
            @RequestParam int maxWeight,
            @RequestParam int minHeight,
            @RequestParam int minWeight
    ) {
        final Filter filter = new Filter(name, minHeight, minWeight, maxWeight, maxHeight);
        return pokemonService.getPokemons(filter);
    }
}
