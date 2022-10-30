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
    public List<Pokemon> getPokemons(@RequestBody Filter filter) {
        return pokemonService.getPokemons(filter);
    }
}
