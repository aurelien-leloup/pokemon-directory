package com.miuros.pokemondirectory.controller;

import com.miuros.pokemondirectory.models.Filter;
import com.miuros.pokemondirectory.models.Pokemon;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {

    @GetMapping
    @ResponseBody
    public List<Pokemon> getPokemons(@RequestBody Filter filter) {
        return List.of();
    }
}
