import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Filter } from "../models/filter";
import { Pokemon } from "../models/pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private readonly http: HttpClient) {
  }

  getPokemon(filters: Filter[]) {
    return this.http.get<Pokemon[]>('backend');
  }
}
